import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import * as d3 from "d3";
import { WordRoot, IELTSWordExample } from "../types";
import { SpeechService, getRootPronunciation, getWordPronunciation } from "../lib/speechSynthesis";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Lightbulb,
  Volume2,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
  Info,
  Compass,
  CheckCircle2,
  Tag
} from "lucide-react";

interface D3RootsMindmapProps {
  allRoots: WordRoot[];
  onSelectRoot?: (root: WordRoot) => void;
  selectedRootId?: string | null;
}

interface MindmapHierarchyNode {
  id: string;
  name: string;
  subtitle?: string;
  type: "hub" | "trunk" | "root" | "word";
  trunkNumber?: number;
  color?: string;
  meaning?: string;
  phonetic?: string;
  level?: string;
  rootData?: WordRoot;
  wordData?: IELTSWordExample;
  children?: MindmapHierarchyNode[];
  _children?: MindmapHierarchyNode[]; // For collapse/expand
}

// 18 Trunks Color and Label Palette
const TRUNK_PALETTE: { [key: number]: { color: string; label: string; short: string; bg: string } } = {
  1: { color: "#3B82F6", label: "Tác Động & Định Hướng", short: "Action & Vector", bg: "bg-blue-500" },
  2: { color: "#8B5CF6", label: "Tư Duy & Diễn Ngôn", short: "Mind & Discourse", bg: "bg-purple-500" },
  3: { color: "#10B981", label: "Con Người & Thể Chế", short: "Society & Law", bg: "bg-emerald-500" },
  4: { color: "#F59E0B", label: "Vận Động & Thời Không", short: "Dynamics & Flow", bg: "bg-amber-500" },
  5: { color: "#EF4444", label: "Xung Động & Tác Lực", short: "Force & Urge", bg: "bg-rose-500" },
  6: { color: "#06B6D4", label: "Chân Lý & Chuẩn Mực", short: "Truth & Measure", bg: "bg-cyan-500" },
  7: { color: "#6366F1", label: "Vị Thế & Cố Định", short: "State & Position", bg: "bg-indigo-500" },
  8: { color: "#F97316", label: "Vòng Đời & Tiến Trình", short: "Cycle & Limits", bg: "bg-orange-500" },
  9: { color: "#14B8A6", label: "Đo Lường & Định Lượng", short: "Scale & Bounds", bg: "bg-teal-500" },
  10: { color: "#E11D48", label: "Xung Đột & Đối Kháng", short: "Conflict & Strike", bg: "bg-red-600" },
  11: { color: "#7C3AED", label: "Phân Bổ & Trách Nhiệm", short: "Share & Bounds", bg: "bg-violet-600" },
  12: { color: "#0EA5E9", label: "Đích Đến & Ý Hướng", short: "Aim & Scope", bg: "bg-sky-500" },
  13: { color: "#D946EF", label: "Gắn Kết & Liên Tục", short: "Bind & Connect", bg: "bg-fuchsia-500" },
  14: { color: "#84CC16", label: "Thiện Ác & Lợi Hại", short: "Harm & Benefit", bg: "bg-lime-500" },
  15: { color: "#78716C", label: "Đầy Đủ & Khan Hiếm", short: "Full & Scarce", bg: "bg-stone-500" },
  16: { color: "#EAB308", label: "Dẫn Dắt & Quản Trị", short: "Lead & Direct", bg: "bg-yellow-500" },
  17: { color: "#059669", label: "Hình Thái & Đột Biến", short: "Form & Mutation", bg: "bg-emerald-600" },
  18: { color: "#9333EA", label: "Minh Bạch & Ẩn Khuất", short: "Light & Conceal", bg: "bg-purple-600" },
};

export const D3RootsMindmap: React.FC<D3RootsMindmapProps> = ({
  allRoots,
  onSelectRoot,
  selectedRootId,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Inspector State (Selected Root or Word for memory tip & association)
  const [inspectedRoot, setInspectedRoot] = useState<WordRoot | null>(null);
  const [inspectedWord, setInspectedWord] = useState<IELTSWordExample | null>(null);

  // Filter & View Options
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTrunkFilter, setSelectedTrunkFilter] = useState<number | "all">("all");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [activeLayoutDepth, setActiveLayoutDepth] = useState<"trunks" | "roots" | "words">("roots");

  // Keep inspectedRoot in sync with selectedRootId from parent if specified
  useEffect(() => {
    if (selectedRootId) {
      const found = allRoots.find((r) => r.id === selectedRootId);
      if (found) {
        setInspectedRoot(found);
        setInspectedWord(found.exampleWords?.[0] || null);
      }
    } else if (!inspectedRoot && allRoots.length > 0) {
      setInspectedRoot(allRoots[0]);
      setInspectedWord(allRoots[0].exampleWords?.[0] || null);
    }
  }, [selectedRootId, allRoots]);

  // Audio Pronunciation Handler
  const handlePlayAudio = (text: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isSpeaking === id) {
      SpeechService.stop();
      setIsSpeaking(null);
      return;
    }
    setIsSpeaking(id);
    SpeechService.speak(text, {
      rate: 0.85,
      onEnd: () => setIsSpeaking(null),
      onError: () => setIsSpeaking(null),
    });
  };

  // Group Roots into 18 Trunks
  const trunkGroups = useMemo(() => {
    const groups: { [key: number]: WordRoot[] } = {};
    for (let i = 1; i <= 18; i++) {
      groups[i] = [];
    }

    allRoots.forEach((root) => {
      // Find trunk match
      for (let i = 1; i <= 18; i++) {
        const isMatch =
          root.category.includes(`Trục ${i}`) ||
          (root.axis && root.axis.includes(`Trục ${i}`)) ||
          (root.axisTitle && root.axisTitle.includes(`Trục ${i}`));
        if (isMatch) {
          groups[i].push(root);
          return;
        }
      }
      // fallback to trunk 1
      groups[1].push(root);
    });

    return groups;
  }, [allRoots]);

  // Build hierarchical data for D3
  const hierarchyData = useMemo<MindmapHierarchyNode>(() => {
    const rootHubNode: MindmapHierarchyNode = {
      id: "hub-center",
      name: "ĐẠI LỘ GỐC TỪ",
      subtitle: "18 Trục Học Thuật (Band 7.5 - 9.0)",
      type: "hub",
      color: "#0F172A",
      children: [],
    };

    for (let trunkNum = 1; trunkNum <= 18; trunkNum++) {
      const roots: WordRoot[] = trunkGroups[trunkNum] || [];
      if (selectedTrunkFilter !== "all" && selectedTrunkFilter !== trunkNum) {
        continue;
      }

      const palette = TRUNK_PALETTE[trunkNum] || {
        color: "#2563EB",
        label: `Trục ${trunkNum}`,
        short: `Axis ${trunkNum}`,
        bg: "bg-blue-600",
      };

      const trunkNode: MindmapHierarchyNode = {
        id: `trunk-${trunkNum}`,
        name: `Trục ${trunkNum}: ${palette.short}`,
        subtitle: palette.label,
        type: "trunk",
        trunkNumber: trunkNum,
        color: palette.color,
        children: [],
      };

      roots.forEach((r) => {
        // Check search query filter
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          r.root.toLowerCase().includes(query) ||
          r.meaning.toLowerCase().includes(query) ||
          r.exampleWords.some(
            (w) =>
              w.word.toLowerCase().includes(query) ||
              w.meaning.toLowerCase().includes(query)
          );

        if (!matchesSearch) return;

        const rootNode: MindmapHierarchyNode = {
          id: `root-${r.id}`,
          name: r.root,
          meaning: r.meaning,
          type: "root",
          trunkNumber: trunkNum,
          color: palette.color,
          rootData: r,
          children: [],
        };

        // Add C1/C2 word children (up to 4 key words)
        r.exampleWords.slice(0, 4).forEach((w, wIdx) => {
          rootNode.children?.push({
            id: `word-${r.id}-${wIdx}`,
            name: w.word,
            meaning: w.meaning,
            level: w.level || "C1",
            type: "word",
            trunkNumber: trunkNum,
            color: palette.color,
            rootData: r,
            wordData: w,
          });
        });

        trunkNode.children?.push(rootNode);
      });

      if (trunkNode.children && trunkNode.children.length > 0) {
        rootHubNode.children?.push(trunkNode);
      }
    }

    return rootHubNode;
  }, [trunkGroups, selectedTrunkFilter, searchQuery]);

  // Main D3 Rendering Function
  const renderD3Mindmap = useCallback(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = Math.max(container.clientWidth || 900, 850);
    const height = Math.max(container.clientHeight || 650, 620);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous drawing

    svg.attr("width", width).attr("height", height);

    // Definitions for arrowheads, drop shadows and gradients
    const defs = svg.append("defs");

    // Drop shadow filter
    const filter = defs.append("filter")
      .attr("id", "mindmap-shadow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");

    filter.append("feDropShadow")
      .attr("dx", 0)
      .attr("dy", 3)
      .attr("stdDeviation", 4)
      .attr("flood-color", "#000000")
      .attr("flood-opacity", 0.25);

    // Subtle glow filter
    const glow = defs.append("filter")
      .attr("id", "mindmap-glow")
      .attr("x", "-30%")
      .attr("y", "-30%")
      .attr("width", "160%")
      .attr("height", "160%");

    glow.append("feGaussianBlur")
      .attr("stdDeviation", "3.5")
      .attr("result", "coloredBlur");
    const feMerge = glow.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Root Group for Zoom and Pan
    const g = svg.append("g").attr("class", "mindmap-content");

    // Initialize D3 Hierarchy
    const rootHierarchy = d3.hierarchy<MindmapHierarchyNode>(hierarchyData);

    // Filter depth based on activeLayoutDepth
    rootHierarchy.each((node) => {
      if (activeLayoutDepth === "trunks" && node.depth >= 1) {
        node.children = undefined;
      } else if (activeLayoutDepth === "roots" && node.depth >= 2) {
        node.children = undefined;
      }
    });

    // Compute dynamic layout sizing
    const leafCount = rootHierarchy.leaves().length;
    const dynamicHeight = Math.max(height * 1.3, leafCount * 36 + 180);
    const dynamicWidth = width * 1.5;

    // Tree Layout
    const treeLayout = d3.tree<MindmapHierarchyNode>()
      .size([dynamicHeight, dynamicWidth - 320])
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 1.8));

    const rootTree = treeLayout(rootHierarchy);

    // Curved Link Generator
    const linkGenerator = d3.linkHorizontal<d3.HierarchyPointLink<MindmapHierarchyNode>, d3.HierarchyPointNode<MindmapHierarchyNode>>()
      .x((d) => d.y + 70)
      .y((d) => d.x);

    // Draw Links
    const links = g.append("g")
      .attr("class", "links")
      .selectAll("path")
      .data(rootTree.links())
      .enter()
      .append("path")
      .attr("d", linkGenerator as any)
      .attr("fill", "none")
      .attr("stroke", (d) => {
        if (d.target.data.type === "hub") return "#64748B";
        return d.target.data.color || "#3B82F6";
      })
      .attr("stroke-width", (d) => {
        if (d.target.depth === 1) return 3.2;
        if (d.target.depth === 2) return 2.2;
        return 1.4;
      })
      .attr("stroke-opacity", (d) => {
        if (d.target.depth === 1) return 0.75;
        if (d.target.depth === 2) return 0.65;
        return 0.45;
      })
      .attr("stroke-dasharray", (d) => (d.target.data.type === "word" ? "3,3" : "none"));

    // Draw Nodes Group
    const nodes = g.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(rootTree.descendants())
      .enter()
      .append("g")
      .attr("class", (d) => `node node-${d.data.type}`)
      .attr("transform", (d) => `translate(${d.y + 70},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        event.stopPropagation();
        if (d.data.rootData) {
          setInspectedRoot(d.data.rootData);
          if (d.data.wordData) {
            setInspectedWord(d.data.wordData);
          } else {
            setInspectedWord(d.data.rootData.exampleWords?.[0] || null);
          }
        } else if (d.data.trunkNumber) {
          // Zoom into this cluster
          smoothZoomToNode(d.y + 70, d.x, 1.4);
        }
      });

    // Render Hub Node (Central Root)
    nodes.filter((d) => d.data.type === "hub")
      .each(function (d) {
        const el = d3.select(this);
        el.append("rect")
          .attr("x", -85)
          .attr("y", -30)
          .attr("width", 170)
          .attr("height", 60)
          .attr("rx", 16)
          .attr("fill", "#0F172A")
          .attr("stroke", "#38BDF8")
          .attr("stroke-width", 2.5)
          .attr("filter", "url(#mindmap-shadow)");

        el.append("text")
          .attr("text-anchor", "middle")
          .attr("y", -6)
          .attr("fill", "#FFFFFF")
          .attr("font-size", "12px")
          .attr("font-weight", "900")
          .attr("letter-spacing", "0.05em")
          .text(d.data.name);

        el.append("text")
          .attr("text-anchor", "middle")
          .attr("y", 14)
          .attr("fill", "#94A3B8")
          .attr("font-size", "10px")
          .attr("font-weight", "600")
          .text(d.data.subtitle || "");
      });

    // Render Trunk Nodes (18 Axes)
    nodes.filter((d) => d.data.type === "trunk")
      .each(function (d) {
        const el = d3.select(this);
        const nodeColor = d.data.color || "#3B82F6";

        el.append("rect")
          .attr("x", -10)
          .attr("y", -18)
          .attr("width", 195)
          .attr("height", 36)
          .attr("rx", 10)
          .attr("fill", "#1E293B")
          .attr("stroke", nodeColor)
          .attr("stroke-width", 2)
          .attr("filter", "url(#mindmap-shadow)");

        // Indicator pill
        el.append("rect")
          .attr("x", -10)
          .attr("y", -18)
          .attr("width", 8)
          .attr("height", 36)
          .attr("rx", 4)
          .attr("fill", nodeColor);

        // Trunk title
        el.append("text")
          .attr("x", 6)
          .attr("y", -2)
          .attr("fill", "#F8FAFC")
          .attr("font-size", "11px")
          .attr("font-weight", "800")
          .text(d.data.name);

        // Trunk subtitle / category
        el.append("text")
          .attr("x", 6)
          .attr("y", 12)
          .attr("fill", nodeColor)
          .attr("font-size", "9.5px")
          .attr("font-weight", "600")
          .text(d.data.subtitle || "");
      });

    // Render Root Nodes (Word Roots)
    nodes.filter((d) => d.data.type === "root")
      .each(function (d) {
        const el = d3.select(this);
        const nodeColor = d.data.color || "#3B82F6";
        const isCurrent = inspectedRoot?.id === d.data.rootData?.id;

        el.append("rect")
          .attr("x", -8)
          .attr("y", -16)
          .attr("width", 160)
          .attr("height", 32)
          .attr("rx", 8)
          .attr("fill", isCurrent ? "#0284C7" : "#0F172A")
          .attr("stroke", isCurrent ? "#38BDF8" : nodeColor)
          .attr("stroke-width", isCurrent ? 2.5 : 1.4)
          .attr("filter", isCurrent ? "url(#mindmap-glow)" : "url(#mindmap-shadow)");

        // Root stem text
        el.append("text")
          .attr("x", 6)
          .attr("y", -1)
          .attr("fill", isCurrent ? "#FFFFFF" : "#F1F5F9")
          .attr("font-family", "monospace")
          .attr("font-size", "11px")
          .attr("font-weight", "900")
          .text(d.data.name);

        // Core Vietnamese meaning
        el.append("text")
          .attr("x", 6)
          .attr("y", 11)
          .attr("fill", isCurrent ? "#E0F2FE" : "#94A3B8")
          .attr("font-size", "9px")
          .attr("font-weight", "500")
          .text(d.data.meaning ? (d.data.meaning.length > 22 ? d.data.meaning.slice(0, 20) + "…" : d.data.meaning) : "");
      });

    // Render Word Nodes (C1/C2 Academic Words)
    nodes.filter((d) => d.data.type === "word")
      .each(function (d) {
        const el = d3.select(this);
        const isCurrent = inspectedWord?.word === d.data.wordData?.word;
        const isC2 = d.data.level === "C2";

        el.append("rect")
          .attr("x", -6)
          .attr("y", -13)
          .attr("width", 145)
          .attr("height", 26)
          .attr("rx", 6)
          .attr("fill", isCurrent ? "#312E81" : "#1E293B")
          .attr("stroke", isCurrent ? "#818CF8" : (isC2 ? "#F43F5E" : "#38BDF8"))
          .attr("stroke-width", isCurrent ? 2 : 1)
          .attr("filter", "url(#mindmap-shadow)");

        // Word Text
        el.append("text")
          .attr("x", 6)
          .attr("y", 0)
          .attr("fill", "#FFFFFF")
          .attr("font-size", "10px")
          .attr("font-weight", "700")
          .text(d.data.name);

        // Level pill
        el.append("rect")
          .attr("x", 116)
          .attr("y", -9)
          .attr("width", 18)
          .attr("height", 14)
          .attr("rx", 3)
          .attr("fill", isC2 ? "#E11D48" : "#2563EB");

        el.append("text")
          .attr("x", 125)
          .attr("y", 1)
          .attr("text-anchor", "middle")
          .attr("fill", "#FFFFFF")
          .attr("font-size", "7.5px")
          .attr("font-weight", "900")
          .text(d.data.level || "C1");

        // Mini meaning
        el.append("text")
          .attr("x", 6)
          .attr("y", 10)
          .attr("fill", "#94A3B8")
          .attr("font-size", "8px")
          .text(d.data.meaning ? (d.data.meaning.length > 20 ? d.data.meaning.slice(0, 18) + "…" : d.data.meaning) : "");
      });

    // Zoom & Pan Behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 3.0])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    zoomRef.current = zoom;
    svg.call(zoom as any);

    // Initial centering and fit
    const initialTransform = d3.zoomIdentity
      .translate(40, height / 2 - 20)
      .scale(0.85);

    svg.call(zoom.transform as any, initialTransform);
  }, [hierarchyData, activeLayoutDepth, inspectedRoot, inspectedWord]);

  // Smooth Zoom Helper
  const smoothZoomToNode = (x: number, y: number, targetScale = 1.3) => {
    if (!svgRef.current || !zoomRef.current || !containerRef.current) return;
    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    const width = container.clientWidth || 900;
    const height = container.clientHeight || 650;

    const transform = d3.zoomIdentity
      .translate(width / 2 - x * targetScale, height / 2 - y * targetScale)
      .scale(targetScale);

    svg.transition().duration(750).ease(d3.easeCubicOut).call(zoomRef.current.transform as any, transform);
  };

  // Zoom Control Buttons
  const handleZoomIn = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy as any, 1.3);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy as any, 0.77);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomRef.current || !containerRef.current) return;
    const height = containerRef.current.clientHeight || 650;
    const transform = d3.zoomIdentity.translate(40, height / 2 - 20).scale(0.85);
    d3.select(svgRef.current).transition().duration(500).call(zoomRef.current.transform as any, transform);
  };

  // ResizeObserver for responsive SVG rendering
  useEffect(() => {
    renderD3Mindmap();

    const handleResize = () => {
      renderD3Mindmap();
    };

    const ro = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    return () => {
      ro.disconnect();
    };
  }, [renderD3Mindmap]);

  // Pronunciation Helpers for the Inspector
  const currentRootPron = useMemo(() => {
    if (!inspectedRoot) return { ipa: "", vietnameseGuide: "", spokenText: "" };
    return getRootPronunciation(inspectedRoot.root);
  }, [inspectedRoot]);

  const currentWordPron = useMemo(() => {
    if (!inspectedWord) return { ipa: "", guide: "" };
    return getWordPronunciation(inspectedWord.word, inspectedWord.phonetic, inspectedWord.pronunciationGuide);
  }, [inspectedWord]);

  return (
    <div
      id="d3-mindmap-wrapper"
      className={`bg-slate-950 text-white rounded-2xl border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen ? "fixed inset-2 z-50 rounded-xl" : "relative w-full"
      }`}
    >
      {/* Quick 18-Trunk Jump Bar */}
      <div className="bg-slate-900/60 px-3 py-1.5 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap pl-1 pr-1 flex items-center gap-1">
          <Compass className="w-3 h-3 text-blue-400" />
          Nhảy Nhanh Trục:
        </span>
        <button
          type="button"
          onClick={() => setSelectedTrunkFilter("all")}
          className={`px-2 py-0.5 rounded-md font-bold whitespace-nowrap transition-all cursor-pointer ${
            selectedTrunkFilter === "all"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-slate-800/70 text-slate-400 hover:text-white"
          }`}
        >
          Tất cả (18)
        </button>
        {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => {
          const p = TRUNK_PALETTE[num];
          const isSelected = selectedTrunkFilter === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => setSelectedTrunkFilter(isSelected ? "all" : num)}
              className={`px-2 py-0.5 rounded-md whitespace-nowrap font-medium transition-all flex items-center gap-1 cursor-pointer ${
                isSelected
                  ? "bg-blue-500 text-white font-bold ring-1 ring-blue-300"
                  : "bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700/60"
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: p?.color || "#3B82F6" }}
              />
              <span>T{num}: {p?.short}</span>
            </button>
          );
        })}
      </div>

      {/* Mindmap Header & Controls Bar */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-sans text-sm md:text-base font-black tracking-tight text-white flex items-center gap-2">
              <span>Sơ Đồ Mindmap D3.js 18 Trục Gốc Từ Academic</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Interactive Canvas
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Phóng to, thu nhỏ, nhấp vào trục hoặc gốc từ để xem liên tưởng và giải phẫu từ vựng C1/C2
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm gốc / từ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs bg-slate-800 text-slate-100 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 w-28 md:w-36 transition-all"
            />
          </div>

          {/* Cluster Filter (18 Trunks) */}
          <select
            value={selectedTrunkFilter}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedTrunkFilter(val === "all" ? "all" : parseInt(val, 10));
            }}
            className="text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
          >
            <option value="all">Toàn bộ 18 Trục</option>
            {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                Trục {num}: {TRUNK_PALETTE[num]?.short}
              </option>
            ))}
          </select>

          {/* Depth Toggle */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveLayoutDepth("trunks")}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                activeLayoutDepth === "trunks" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Trục
            </button>
            <button
              type="button"
              onClick={() => setActiveLayoutDepth("roots")}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                activeLayoutDepth === "roots" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Gốc
            </button>
            <button
              type="button"
              onClick={() => setActiveLayoutDepth("words")}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                activeLayoutDepth === "words" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Từ Vựng
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button
              type="button"
              onClick={handleZoomIn}
              title="Phóng to (+)"
              className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              title="Thu nhỏ (-)"
              className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              title="Căn giữa & Đặt lại"
              className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Thu nhỏ cửa sổ" : "Mở toàn màn hình"}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage: SVG Canvas + Floating Memory Association Inspector */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-[580px] relative overflow-hidden">
        {/* D3 SVG Canvas */}
        <div ref={containerRef} className="flex-1 w-full h-[520px] lg:h-[620px] relative bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing">
          <svg ref={svgRef} className="w-full h-full block" />

          {/* Canvas Guide Pill */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Lăn chuột để Zoom • Kéo để Di chuyển • Nhấp vào nhánh để Xem liên tưởng</span>
          </div>
        </div>

        {/* Mẹo Liên Tưởng & Giải Phẫu Hình Thái Học (Interactive Inspector) */}
        <div className="w-full lg:w-[380px] bg-slate-900/95 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 md:p-5 flex flex-col justify-between overflow-y-auto max-h-[520px] lg:max-h-[620px] shadow-xl">
          {inspectedRoot ? (
            <div className="space-y-4">
              {/* Header: Root Stem, Phonetic, Audio */}
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                      Gốc Từ Hình Thái Học
                    </span>
                    <h4 className="font-sans text-2xl font-black text-white mt-1">
                      {inspectedRoot.root}
                    </h4>
                  </div>

                  {/* Audio Button */}
                  <button
                    type="button"
                    onClick={(e) =>
                      handlePlayAudio(
                        currentRootPron.spokenText || inspectedRoot.root,
                        `inspect-root-${inspectedRoot.id}`,
                        e
                      )
                    }
                    className={`p-2 rounded-xl transition-all cursor-pointer border ${
                      isSpeaking === `inspect-root-${inspectedRoot.id}`
                        ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                        : "bg-blue-600 text-white hover:bg-blue-500 border-blue-500 shadow-md"
                    }`}
                    title="Nghe phát âm chuẩn gốc từ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Pronunciation Badges */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    IPA: {inspectedRoot.phonetic || currentRootPron.ipa}
                  </span>
                  <span className="text-[11px] font-sans text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                    Đọc: <strong>{inspectedRoot.pronunciationGuide || currentRootPron.vietnameseGuide}</strong>
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 font-medium">
                  <strong>Ý nghĩa cốt lõi:</strong> {inspectedRoot.meaning}
                </p>
                {inspectedRoot.origin && (
                  <p className="text-[11px] text-slate-400 italic mt-0.5">
                    Nguồn gốc: {inspectedRoot.origin}
                  </p>
                )}
              </div>

              {/* Mẹo Liên Tưởng Gợi Nhớ (Mnemonic Association Card) */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30 text-amber-200 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Mẹo Liên Tưởng Gợi Nhớ Nhanh</span>
                </div>
                <p className="text-xs text-amber-100/90 leading-relaxed italic">
                  "{inspectedRoot.tip || inspectedRoot.description}"
                </p>
              </div>

              {/* Morphological Association Equation (Hình Vẽ / Sơ Đồ Liên Kết Từ) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Sơ Đồ Giải Phẫu Hình Thái Từ
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {inspectedRoot.exampleWords?.length || 0} từ C1/C2
                  </span>
                </div>

                {/* Word Select Tabs / Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {inspectedRoot.exampleWords.map((w, idx) => {
                    const isSelected = inspectedWord?.word === w.word;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setInspectedWord(w)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-400 shadow-sm ring-1 ring-blue-400"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700"
                        }`}
                      >
                        {w.word}
                      </button>
                    );
                  })}
                </div>

                {/* Active Inspected Word Equation Card */}
                {inspectedWord && (
                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{inspectedWord.word}</span>
                        <span className="text-[10px] font-mono text-slate-400">({inspectedWord.partOfSpeech})</span>
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                            inspectedWord.level === "C2" ? "bg-rose-900 text-rose-200" : "bg-blue-900 text-blue-200"
                          }`}
                        >
                          {inspectedWord.level || "C1"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) =>
                          handlePlayAudio(inspectedWord.word, `inspect-word-${inspectedWord.word}`, e)
                        }
                        className="p-1 rounded hover:bg-slate-700 text-blue-400 cursor-pointer"
                        title="Nghe phát âm từ này"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Visual Breakdown Equation / Morphological Diagram */}
                    {inspectedWord.visualBreakdown && (
                      <div className="bg-slate-900/95 rounded-xl p-3 border border-slate-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-amber-400" />
                            Sơ Đồ Ghép Từ & Liên Kết Hình Thái:
                          </span>
                        </div>

                        {/* Interactive Equation Flow */}
                        <div className="flex flex-wrap items-center gap-1.5 py-1">
                          {inspectedWord.visualBreakdown.split(/\s*(\+|\=)\s*/).filter(Boolean).map((part, pIdx) => {
                            if (part === "+") {
                              return (
                                <span key={pIdx} className="text-slate-500 font-black text-xs px-0.5">
                                  +
                                </span>
                              );
                            }
                            if (part === "=") {
                              return (
                                <span key={pIdx} className="text-amber-400 font-black text-xs px-0.5 flex items-center">
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                              );
                            }
                            const isResult = inspectedWord.visualBreakdown?.indexOf("=") !== -1 && 
                              inspectedWord.visualBreakdown?.indexOf(part) > (inspectedWord.visualBreakdown?.indexOf("=") || 0);

                            return (
                              <span
                                key={pIdx}
                                className={`px-2 py-1 rounded-md text-[11px] font-mono font-medium transition-transform hover:scale-105 border ${
                                  isResult
                                    ? "bg-amber-500/20 text-amber-200 border-amber-500/40 font-bold"
                                    : part.includes("-")
                                    ? "bg-blue-900/40 text-blue-300 border-blue-700/50"
                                    : "bg-emerald-950/50 text-emerald-300 border-emerald-700/50"
                                }`}
                              >
                                {part}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {inspectedWord.collocation && (
                      <div className="text-[11px] text-indigo-300 bg-indigo-950/40 px-2 py-1 rounded border border-indigo-800/40 flex items-center gap-1">
                        <Tag className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span>{inspectedWord.collocation}</span>
                      </div>
                    )}

                    <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-2 rounded border-l-2 border-blue-500">
                      <p className="italic text-slate-200">"{inspectedWord.ieltsSentence}"</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        👉 <strong>Nghĩa:</strong> {inspectedWord.vietnameseTranslation}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button: Jump to Boulevard List */}
              <button
                type="button"
                onClick={() => {
                  if (onSelectRoot && inspectedRoot) {
                    onSelectRoot(inspectedRoot);
                  }
                  document.getElementById(`root-item-${inspectedRoot.id}`)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Xem Thẻ Chi Tiết Trên Đại Lộ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Compass className="w-8 h-8 mx-auto text-slate-600 animate-spin" />
              <p className="text-xs">Nhấp vào bất kỳ nốt gốc từ nào trong mindmap để kích hoạt kính lúp liên tưởng.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
