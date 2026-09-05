import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";
import { TopicWord, topicVocabData } from "../data/topicVocabData";
import {
  MACRO_DOMAINS,
  MacroDomain,
  getGroupedMacroDomains,
  GroupedMacroDomain,
  getMacroDomainForCategory
} from "../data/topicVocabMacroDomains";
import { resolveB2Equivalent } from "../data/b2Equivalents";
import { TopicWordDetailView } from "./TopicWordDetailView";
import { SpeechService } from "../lib/speechSynthesis";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  CheckCircle2,
  Tag,
  BookOpen,
  Filter,
  Eye,
  EyeOff,
  Volume2,
  Type,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ArrowRight,
  PanelRightClose,
  PanelRightOpen,
  Compass,
  Check
} from "lucide-react";

interface D3TopicVocabMindmapProps {
  knownWords: string[];
  onToggleKnown: (id: string) => void;
  hideKnown: boolean;
  onToggleHideKnown: (val: boolean) => void;
  initialSelectedWordId?: string | null;
  onOpenAiLesson?: (topic?: string, word?: TopicWord, macro?: string) => void;
  onOpenAiTutor?: (topic?: string, words?: TopicWord[], macro?: string) => void;
  fontScale?: "normal" | "large" | "xlarge";
  onChangeFontScale?: (scale: "normal" | "large" | "xlarge") => void;
  selectedMacroId?: string;
  onSelectMacroId?: (id: string) => void;
}

export const D3TopicVocabMindmap: React.FC<D3TopicVocabMindmapProps> = ({
  knownWords,
  onToggleKnown,
  hideKnown,
  onToggleHideKnown,
  initialSelectedWordId,
  onOpenAiLesson,
  onOpenAiTutor,
  fontScale = "normal",
  onChangeFontScale,
  selectedMacroId: externalMacroId,
  onSelectMacroId: externalSetMacroId,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // 2-Level Mode:
  // "topic_words": Level 1 = Topic Root, Level 2 = Vocabulary Words (Default & Most Practical)
  // "domain_topics": Level 1 = Macro Domain Root, Level 2 = Subtopics
  const [levelMode, setLevelMode] = useState<"topic_words" | "domain_topics">("topic_words");

  // Selected Macro Domain
  const [internalMacroId, setInternalMacroId] = useState<string>(MACRO_DOMAINS[0].id);
  const activeMacroId = externalMacroId && externalMacroId !== "all" ? externalMacroId : internalMacroId;

  const handleSelectMacro = (id: string) => {
    setInternalMacroId(id);
    if (externalSetMacroId) externalSetMacroId(id);
    setActiveSubcatIndex(0);
  };

  // Active Subcategory/Topic Index within the selected macro domain
  const [activeSubcatIndex, setActiveSubcatIndex] = useState<number>(0);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inspectedWord, setInspectedWord] = useState<TopicWord | null>(null);
  const [showInspector, setShowInspector] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Display Scaling
  const [displayScale, setDisplayScale] = useState<"compact" | "normal" | "large" | "xlarge">(() => {
    if (fontScale === "xlarge") return "xlarge";
    if (fontScale === "large") return "large";
    return "normal";
  });

  useEffect(() => {
    if (fontScale === "xlarge") setDisplayScale("xlarge");
    else if (fontScale === "large") setDisplayScale("large");
    else setDisplayScale("normal");
  }, [fontScale]);

  const handleSetDisplayScale = (scale: "compact" | "normal" | "large" | "xlarge") => {
    setDisplayScale(scale);
    if (onChangeFontScale) {
      if (scale === "xlarge") onChangeFontScale("xlarge");
      else if (scale === "large") onChangeFontScale("large");
      else onChangeFontScale("normal");
    }
  };

  // Zoom tracker
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  // Filtered active words
  const activeWords = useMemo(() => {
    let list = topicVocabData;
    if (hideKnown) {
      list = list.filter((w) => !knownWords.includes(w.id));
    }
    return list;
  }, [hideKnown, knownWords]);

  // Grouped data
  const groupedData = useMemo(() => {
    return getGroupedMacroDomains(activeWords);
  }, [activeWords]);

  // Active Macro Group
  const currentMacroGroup = useMemo(() => {
    return groupedData.find((g) => g.domain.id === activeMacroId) || groupedData[0];
  }, [groupedData, activeMacroId]);

  // Active Subcategory (Topic)
  const currentSubcategory = useMemo(() => {
    if (!currentMacroGroup || currentMacroGroup.subcategories.length === 0) return null;
    const safeIdx = Math.min(Math.max(0, activeSubcatIndex), currentMacroGroup.subcategories.length - 1);
    return currentMacroGroup.subcategories[safeIdx];
  }, [currentMacroGroup, activeSubcatIndex]);

  // Initial selected word
  useEffect(() => {
    if (initialSelectedWordId) {
      const found = topicVocabData.find((w) => w.id === initialSelectedWordId);
      if (found) {
        setInspectedWord(found);
        setShowInspector(true);
        // Find which macro and topic contains this word
        const matchedMacro = groupedData.find((g) =>
          g.subcategories.some((sub) => sub.category === found.category)
        );
        if (matchedMacro) {
          setInternalMacroId(matchedMacro.domain.id);
          if (externalSetMacroId) externalSetMacroId(matchedMacro.domain.id);
          const subIdx = matchedMacro.subcategories.findIndex((sub) => sub.category === found.category);
          if (subIdx >= 0) setActiveSubcatIndex(subIdx);
        }
      }
    }
  }, [initialSelectedWordId]);

  // Scale multiplier for math
  const scaleMultiplier = useMemo(() => {
    switch (displayScale) {
      case "compact":
        return 0.88;
      case "large":
        return 1.15;
      case "xlarge":
        return 1.35;
      case "normal":
      default:
        return 1.0;
    }
  }, [displayScale]);

  // Navigation between adjacent words in inspector
  const { prevWord, nextWord } = useMemo(() => {
    if (!inspectedWord || !currentSubcategory) return { prevWord: null, nextWord: null };
    const list = currentSubcategory.words;
    const idx = list.findIndex((w) => w.id === inspectedWord.id);
    return {
      prevWord: idx > 0 ? list[idx - 1] : null,
      nextWord: idx < list.length - 1 ? list[idx + 1] : null,
    };
  }, [inspectedWord, currentSubcategory]);

  // Audio helper
  const handlePronounce = (word: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPlayingWordId(id);
    SpeechService.speak(word, {
      rate: 0.9,
      onEnd: () => setPlayingWordId(null),
      onError: () => setPlayingWordId(null),
    });
  };

  // Switch to a specific topic and activate "topic_words" 2-level mode
  const handleSelectTopicFromDomain = (catIdx: number) => {
    setActiveSubcatIndex(catIdx);
    setLevelMode("topic_words");
  };

  // --- D3 BILATERAL 2-LEVEL MINDMAP RENDERING ---
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const container = containerRef.current;
    // Account for docked inspector panel if active
    const inspectorWidth = inspectedWord && showInspector ? 360 : 0;
    const width = Math.max(container.clientWidth - inspectorWidth || 800, 640);
    const height = isFullscreen ? Math.max(window.innerHeight - 150, 680) : 660;

    svg.attr("width", width).attr("height", height);

    // Defs
    const defs = svg.append("defs");

    // Soft Card Drop Shadow
    const shadowFilter = defs
      .append("filter")
      .attr("id", "mindmap-card-shadow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");
    shadowFilter
      .append("feDropShadow")
      .attr("dx", 0)
      .attr("dy", 3)
      .attr("stdDeviation", 4)
      .attr("flood-color", "#0F172A")
      .attr("flood-opacity", 0.08);

    // Active Glow Filter
    const glowFilter = defs
      .append("filter")
      .attr("id", "mindmap-active-glow")
      .attr("x", "-30%")
      .attr("y", "-30%")
      .attr("width", "160%")
      .attr("height", "160%");
    glowFilter
      .append("feGaussianBlur")
      .attr("stdDeviation", "3.5")
      .attr("result", "blur");
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "blur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Dotted canvas pattern
    const pattern = defs
      .append("pattern")
      .attr("id", "mindmap-dots")
      .attr("width", 28)
      .attr("height", 28)
      .attr("patternUnits", "userSpaceOnUse");
    pattern
      .append("circle")
      .attr("cx", 2)
      .attr("cy", 2)
      .attr("r", 1.2)
      .attr("fill", "#E2E8F0");

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "url(#mindmap-dots)")
      .style("pointer-events", "none");

    // Zoomable Stage
    const g = svg.append("g").attr("class", "mindmap-stage");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.45, 2.2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        setZoomPercent(Math.round(event.transform.k * 100));
      });

    svg.call(zoom);
    zoomRef.current = zoom;

    const scale = scaleMultiplier;
    const domain = currentMacroGroup?.domain || MACRO_DOMAINS[0];
    const q = searchQuery.toLowerCase().trim();

    // =========================================================================
    // CASE 1: LEVEL MODE = "topic_words" (Chủ đề ➔ Từ vựng học thuật - 2 Cấp Độ)
    // =========================================================================
    if (levelMode === "topic_words" && currentSubcategory) {
      // 1. Filter words matching search query if any
      let wordsList = currentSubcategory.words;
      if (q) {
        wordsList = wordsList.filter(
          (w) =>
            w.word.toLowerCase().includes(q) ||
            w.vietnamese.toLowerCase().includes(q) ||
            w.definition.toLowerCase().includes(q) ||
            resolveB2Equivalent(w).toLowerCase().includes(q)
        );
      }

      // Root Card Dimensions (Level 1)
      const rootW = 280 * scale;
      const rootH = 88 * scale;
      const rootX = 0;
      const rootY = 0;

      // Child Card Dimensions (Level 2)
      const cardW = 236 * scale;
      const cardH = 58 * scale;
      const verticalStep = 74 * scale;
      const horizontalGap = 160 * scale;

      // Split words symmetrically into Left and Right branches
      const totalWords = wordsList.length;
      const leftCount = Math.ceil(totalWords / 2);
      const rightCount = totalWords - leftCount;

      const leftWords = wordsList.slice(0, leftCount);
      const rightWords = wordsList.slice(leftCount);

      // Left Nodes Coordinates (strictly horizontal, zero overlap guaranteed!)
      const leftStartX = -(rootW / 2 + horizontalGap);
      const leftTotalHeight = Math.max((leftCount - 1) * verticalStep, 0);
      const leftTopY = -leftTotalHeight / 2;

      const leftNodePositions = leftWords.map((word, i) => ({
        word,
        side: "left" as const,
        x: leftStartX - cardW / 2,
        y: leftTopY + i * verticalStep,
        anchorX: leftStartX, // Right edge of card connects to center
        anchorY: leftTopY + i * verticalStep,
      }));

      // Right Nodes Coordinates (strictly horizontal, zero overlap guaranteed!)
      const rightStartX = rootW / 2 + horizontalGap;
      const rightTotalHeight = Math.max((rightCount - 1) * verticalStep, 0);
      const rightTopY = -rightTotalHeight / 2;

      const rightNodePositions = rightWords.map((word, i) => ({
        word,
        side: "right" as const,
        x: rightStartX + cardW / 2,
        y: rightTopY + i * verticalStep,
        anchorX: rightStartX, // Left edge of card connects to center
        anchorY: rightTopY + i * verticalStep,
      }));

      const allChildNodes = [...leftNodePositions, ...rightNodePositions];

      // 2. DRAW CONNECTING BRANCH LINKS (Smooth Organic Cubic Bézier Curves)
      const linksGroup = g.append("g").attr("class", "mindmap-links-layer");

      // Root anchors
      const rootLeftAnchorX = -rootW / 2;
      const rootRightAnchorX = rootW / 2;
      const rootAnchorY = 0;

      allChildNodes.forEach((node) => {
        const isLeft = node.side === "left";
        const startX = isLeft ? rootLeftAnchorX : rootRightAnchorX;
        const startY = rootAnchorY;
        const endX = node.anchorX;
        const endY = node.anchorY;

        const deltaX = Math.abs(endX - startX) * 0.48;
        const cp1X = isLeft ? startX - deltaX : startX + deltaX;
        const cp2X = isLeft ? endX + deltaX : endX - deltaX;

        const pathData = `M ${startX} ${startY} C ${cp1X} ${startY}, ${cp2X} ${endY}, ${endX} ${endY}`;

        const isCurrent = inspectedWord?.id === node.word.id;
        const isMastered = knownWords.includes(node.word.id);

        // Branch path
        linksGroup
          .append("path")
          .attr("d", pathData)
          .attr("fill", "none")
          .attr("stroke", isCurrent ? "#2563EB" : isMastered ? "#10B981" : domain.color)
          .attr("stroke-width", isCurrent ? 3.2 * scale : 2 * scale)
          .attr("stroke-opacity", isCurrent ? 1 : 0.65)
          .attr("stroke-dasharray", isMastered ? "none" : "none");

        // Small glowing branch joint dot at connection point
        linksGroup
          .append("circle")
          .attr("cx", endX)
          .attr("cy", endY)
          .attr("r", (isCurrent ? 4.5 : 3) * scale)
          .attr("fill", isCurrent ? "#2563EB" : isMastered ? "#10B981" : domain.color);
      });

      // 3. DRAW LEVEL 1: CENTRAL ROOT TOPIC NODE (Nút Trung Tâm Chủ Đề)
      const rootGroup = g
        .append("g")
        .attr("class", "level1-root-node")
        .attr("transform", `translate(${rootX}, ${rootY})`)
        .style("cursor", "default");

      // Outer glow pulse
      rootGroup
        .append("rect")
        .attr("x", -rootW / 2 - 3 * scale)
        .attr("y", -rootH / 2 - 3 * scale)
        .attr("width", rootW + 6 * scale)
        .attr("height", rootH + 6 * scale)
        .attr("rx", 18 * scale)
        .attr("fill", "none")
        .attr("stroke", domain.color)
        .attr("stroke-width", 2.5 * scale)
        .attr("filter", "url(#mindmap-active-glow)")
        .attr("opacity", 0.7);

      // Main Root Card Box
      rootGroup
        .append("rect")
        .attr("x", -rootW / 2)
        .attr("y", -rootH / 2)
        .attr("width", rootW)
        .attr("height", rootH)
        .attr("rx", 16 * scale)
        .attr("fill", "#0F172A")
        .attr("stroke", domain.color)
        .attr("stroke-width", 2.8 * scale)
        .attr("filter", "url(#mindmap-card-shadow)");

      // Top Tag: Domain Emoji + Name
      rootGroup
        .append("text")
        .attr("x", 0)
        .attr("y", -rootH / 2 + 18 * scale)
        .attr("text-anchor", "middle")
        .attr("fill", domain.color)
        .attr("font-size", `${10.5 * scale}px`)
        .attr("font-weight", "800")
        .attr("letter-spacing", "0.5px")
        .text(`${domain.emoji} ${domain.name.toUpperCase()}`);

      // Middle: Topic Title (Large, Bold, Clean)
      rootGroup
        .append("text")
        .attr("x", 0)
        .attr("y", -rootH / 2 + 40 * scale)
        .attr("text-anchor", "middle")
        .attr("fill", "#FFFFFF")
        .attr("font-size", `${13.5 * scale}px`)
        .attr("font-weight", "900")
        .text(() => {
          const name = currentSubcategory.category;
          return name.length > 26 ? name.slice(0, 25) + "..." : name;
        });

      // Bottom Metadata: Target Band & Mastered Progress
      const masteredInTopic = currentSubcategory.words.filter((w) => knownWords.includes(w.id)).length;
      const progressText = `Đã thuộc ${masteredInTopic}/${currentSubcategory.words.length} từ  •  Band 7.0 - 8.5`;

      rootGroup
        .append("text")
        .attr("x", 0)
        .attr("y", -rootH / 2 + 63 * scale)
        .attr("text-anchor", "middle")
        .attr("fill", "#94A3B8")
        .attr("font-size", `${10 * scale}px`)
        .attr("font-weight", "600")
        .attr("font-family", "monospace")
        .text(progressText);

      // Mini Progress bar under root card
      const barW = (rootW - 40 * scale);
      const barH = 3 * scale;
      const progressRatio = currentSubcategory.words.length > 0 ? masteredInTopic / currentSubcategory.words.length : 0;

      rootGroup
        .append("rect")
        .attr("x", -barW / 2)
        .attr("y", rootH / 2 - 10 * scale)
        .attr("width", barW)
        .attr("height", barH)
        .attr("rx", 1.5 * scale)
        .attr("fill", "#334155");

      rootGroup
        .append("rect")
        .attr("x", -barW / 2)
        .attr("y", rootH / 2 - 10 * scale)
        .attr("width", barW * progressRatio)
        .attr("height", barH)
        .attr("rx", 1.5 * scale)
        .attr("fill", "#10B981");

      // 4. DRAW LEVEL 2: CHILD VOCABULARY NODES (Các Nhánh Từ Vựng Học Thuật Cấp 2)
      const nodesGroup = g.append("g").attr("class", "level2-words-layer");

      allChildNodes.forEach((node) => {
        const word = node.word;
        const isCurrent = inspectedWord?.id === word.id;
        const isMastered = knownWords.includes(word.id);
        const b2Word = resolveB2Equivalent(word);

        const gNode = nodesGroup
          .append("g")
          .attr("class", `level2-word-card ${isCurrent ? "current" : ""}`)
          .attr("transform", `translate(${node.x}, ${node.y})`)
          .style("cursor", "pointer")
          .on("click", (e) => {
            e.stopPropagation();
            setInspectedWord(word);
            setShowInspector(true);
          });

        // Highlight ring if currently selected
        if (isCurrent) {
          gNode
            .append("rect")
            .attr("x", -cardW / 2 - 2 * scale)
            .attr("y", -cardH / 2 - 2 * scale)
            .attr("width", cardW + 4 * scale)
            .attr("height", cardH + 4 * scale)
            .attr("rx", 13 * scale)
            .attr("fill", "none")
            .attr("stroke", "#2563EB")
            .attr("stroke-width", 2.5 * scale)
            .attr("filter", "url(#mindmap-active-glow)");
        }

        // Main Card Container
        gNode
          .append("rect")
          .attr("x", -cardW / 2)
          .attr("y", -cardH / 2)
          .attr("width", cardW)
          .attr("height", cardH)
          .attr("rx", 11 * scale)
          .attr("fill", isCurrent ? "#F8FAFC" : isMastered ? "#F0FDF4" : "#FFFFFF")
          .attr("stroke", isCurrent ? "#2563EB" : isMastered ? "#10B981" : "#CBD5E1")
          .attr("stroke-width", (isCurrent ? 2.4 : isMastered ? 1.8 : 1.4) * scale)
          .attr("filter", "url(#mindmap-card-shadow)");

        // Left accent colored bar
        gNode
          .append("path")
          .attr(
            "d",
            `M ${-cardW / 2 + 1.5 * scale} ${-cardH / 2 + 7 * scale}
             Q ${-cardW / 2 + 1.5 * scale} ${-cardH / 2 + 2 * scale}, ${-cardW / 2 + 6 * scale} ${-cardH / 2 + 2 * scale}
             L ${-cardW / 2 + 7 * scale} ${-cardH / 2 + 2 * scale}
             L ${-cardW / 2 + 7 * scale} ${cardH / 2 - 2 * scale}
             L ${-cardW / 2 + 6 * scale} ${cardH / 2 - 2 * scale}
             Q ${-cardW / 2 + 1.5 * scale} ${cardH / 2 - 2 * scale}, ${-cardW / 2 + 1.5 * scale} ${cardH / 2 - 7 * scale}
             Z`
          )
          .attr("fill", isCurrent ? "#2563EB" : isMastered ? "#10B981" : domain.color);

        const contentLeft = -cardW / 2 + 14 * scale;

        // Line 1: Headword + IPA
        const headwordText = word.word.length > 17 ? word.word.slice(0, 16) + "…" : word.word;
        gNode
          .append("text")
          .attr("x", contentLeft)
          .attr("y", -cardH / 2 + 16 * scale)
          .attr("dominant-baseline", "middle")
          .attr("fill", isCurrent ? "#1E40AF" : isMastered ? "#065F46" : "#0F172A")
          .attr("font-size", `${12.5 * scale}px`)
          .attr("font-weight", "900")
          .text(headwordText);

        // IPA
        if (word.phonetic) {
          const ipaText = `/${word.phonetic}/`;
          const ipaTrunc = ipaText.length > 15 ? ipaText.slice(0, 14) + "…/" : ipaText;
          gNode
            .append("text")
            .attr("x", cardW / 2 - 42 * scale)
            .attr("y", -cardH / 2 + 16 * scale)
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "middle")
            .attr("fill", "#64748B")
            .attr("font-size", `${9.5 * scale}px`)
            .attr("font-family", "monospace")
            .attr("font-weight", "600")
            .text(ipaTrunc);
        }

        // Line 2: Vietnamese Definition (Clear, readable, no overlap)
        const vnDef = word.vietnamese.length > 25 ? word.vietnamese.slice(0, 24) + "…" : word.vietnamese;
        gNode
          .append("text")
          .attr("x", contentLeft)
          .attr("y", -cardH / 2 + 32 * scale)
          .attr("dominant-baseline", "middle")
          .attr("fill", "#334155")
          .attr("font-size", `${10.5 * scale}px`)
          .attr("font-weight", "600")
          .text(vnDef);

        // Line 3: Academic Upgrade Tag (B2 -> C1 contrast)
        const b2Text = `B2: ${b2Word}`;
        const b2Trunc = b2Text.length > 26 ? b2Text.slice(0, 25) + "…" : b2Text;
        gNode
          .append("text")
          .attr("x", contentLeft)
          .attr("y", -cardH / 2 + 46 * scale)
          .attr("dominant-baseline", "middle")
          .attr("fill", "#B45309")
          .attr("font-size", `${9 * scale}px`)
          .attr("font-family", "monospace")
          .attr("font-weight", "700")
          .text(b2Trunc);

        // Interactive Fast Audio Speaker Button inside card
        const speakerX = cardW / 2 - 20 * scale;
        const speakerY = -cardH / 2 + 16 * scale;

        const btnSpeaker = gNode
          .append("g")
          .attr("class", "card-btn-speaker")
          .attr("transform", `translate(${speakerX}, ${speakerY})`)
          .style("cursor", "pointer")
          .on("click", (e) => {
            e.stopPropagation();
            handlePronounce(word.word, word.id, e);
          });

        btnSpeaker
          .append("circle")
          .attr("r", 9 * scale)
          .attr("fill", playingWordId === word.id ? "#FEF3C7" : "#F1F5F9")
          .attr("stroke", playingWordId === word.id ? "#F59E0B" : "#CBD5E1")
          .attr("stroke-width", 1);

        btnSpeaker
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("font-size", `${9 * scale}px`)
          .text("🔊");

        // Mastery Checkmark Toggle Button inside card
        const checkX = cardW / 2 - 20 * scale;
        const checkY = -cardH / 2 + 38 * scale;

        const btnMastery = gNode
          .append("g")
          .attr("class", "card-btn-mastery")
          .attr("transform", `translate(${checkX}, ${checkY})`)
          .style("cursor", "pointer")
          .on("click", (e) => {
            e.stopPropagation();
            onToggleKnown(word.id);
          });

        btnMastery
          .append("circle")
          .attr("r", 8.5 * scale)
          .attr("fill", isMastered ? "#10B981" : "#FFFFFF")
          .attr("stroke", isMastered ? "#059669" : "#94A3B8")
          .attr("stroke-width", 1.2);

        if (isMastered) {
          btnMastery
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("fill", "#FFFFFF")
            .attr("font-size", `${9.5 * scale}px`)
            .attr("font-weight", "bold")
            .text("✓");
        }
      });
    }

    // =========================================================================
    // CASE 2: LEVEL MODE = "domain_topics" (Nhóm Vĩ mô ➔ Các Chủ đề - 2 Cấp Độ)
    // =========================================================================
    else if (levelMode === "domain_topics" && currentMacroGroup) {
      const subcats = currentMacroGroup.subcategories;
      const totalSubs = subcats.length;

      // Root Card: Macro Domain (Level 1)
      const rootW = 310 * scale;
      const rootH = 92 * scale;
      const rootX = 0;
      const rootY = 0;

      // Subcategory Child Cards (Level 2)
      const cardW = 240 * scale;
      const cardH = 56 * scale;
      const verticalStep = 72 * scale;
      const horizontalGap = 160 * scale;

      const leftCount = Math.ceil(totalSubs / 2);
      const rightCount = totalSubs - leftCount;

      const leftSubs = subcats.slice(0, leftCount);
      const rightSubs = subcats.slice(leftCount);

      // Left Nodes
      const leftStartX = -(rootW / 2 + horizontalGap);
      const leftTotalHeight = Math.max((leftCount - 1) * verticalStep, 0);
      const leftTopY = -leftTotalHeight / 2;

      const leftPositions = leftSubs.map((sub, i) => ({
        sub,
        idx: i,
        side: "left" as const,
        x: leftStartX - cardW / 2,
        y: leftTopY + i * verticalStep,
        anchorX: leftStartX,
        anchorY: leftTopY + i * verticalStep,
      }));

      // Right Nodes
      const rightStartX = rootW / 2 + horizontalGap;
      const rightTotalHeight = Math.max((rightCount - 1) * verticalStep, 0);
      const rightTopY = -rightTotalHeight / 2;

      const rightPositions = rightSubs.map((sub, i) => ({
        sub,
        idx: leftCount + i,
        side: "right" as const,
        x: rightStartX + cardW / 2,
        y: rightTopY + i * verticalStep,
        anchorX: rightStartX,
        anchorY: rightTopY + i * verticalStep,
      }));

      const allTopicNodes = [...leftPositions, ...rightPositions];

      // Draw Links
      const linksGroup = g.append("g").attr("class", "mindmap-links-layer");
      const rootLeftAnchorX = -rootW / 2;
      const rootRightAnchorX = rootW / 2;

      allTopicNodes.forEach((node) => {
        const isLeft = node.side === "left";
        const startX = isLeft ? rootLeftAnchorX : rootRightAnchorX;
        const startY = 0;
        const endX = node.anchorX;
        const endY = node.anchorY;

        const deltaX = Math.abs(endX - startX) * 0.48;
        const cp1X = isLeft ? startX - deltaX : startX + deltaX;
        const cp2X = isLeft ? endX + deltaX : endX - deltaX;

        const pathData = `M ${startX} ${startY} C ${cp1X} ${startY}, ${cp2X} ${endY}, ${endX} ${endY}`;
        const isSelected = activeSubcatIndex === node.idx;

        linksGroup
          .append("path")
          .attr("d", pathData)
          .attr("fill", "none")
          .attr("stroke", isSelected ? "#2563EB" : domain.color)
          .attr("stroke-width", isSelected ? 3 * scale : 2 * scale)
          .attr("stroke-opacity", isSelected ? 1 : 0.65);

        linksGroup
          .append("circle")
          .attr("cx", endX)
          .attr("cy", endY)
          .attr("r", 3.5 * scale)
          .attr("fill", isSelected ? "#2563EB" : domain.color);
      });

      // Draw Root Node (Macro Domain)
      const rootGroup = g
        .append("g")
        .attr("class", "level1-domain-root")
        .attr("transform", `translate(${rootX}, ${rootY})`);

      rootGroup
        .append("rect")
        .attr("x", -rootW / 2 - 3 * scale)
        .attr("y", -rootH / 2 - 3 * scale)
        .attr("width", rootW + 6 * scale)
        .attr("height", rootH + 6 * scale)
        .attr("rx", 18 * scale)
        .attr("fill", "none")
        .attr("stroke", domain.color)
        .attr("stroke-width", 2.5 * scale)
        .attr("filter", "url(#mindmap-active-glow)")
        .attr("opacity", 0.7);

      rootGroup
        .append("rect")
        .attr("x", -rootW / 2)
        .attr("y", -rootH / 2)
        .attr("width", rootW)
        .attr("height", rootH)
        .attr("rx", 16 * scale)
        .attr("fill", "#0F172A")
        .attr("stroke", domain.color)
        .attr("stroke-width", 2.8 * scale)
        .attr("filter", "url(#mindmap-card-shadow)");

      // Emoji
      rootGroup
        .append("text")
        .attr("x", -rootW / 2 + 24 * scale)
        .attr("y", 0)
        .attr("dominant-baseline", "middle")
        .attr("font-size", `${28 * scale}px`)
        .text(domain.emoji);

      // Name & Stats
      rootGroup
        .append("text")
        .attr("x", -rootW / 2 + 58 * scale)
        .attr("y", -14 * scale)
        .attr("fill", "#FFFFFF")
        .attr("font-size", `${13.5 * scale}px`)
        .attr("font-weight", "900")
        .text(domain.name);

      rootGroup
        .append("text")
        .attr("x", -rootW / 2 + 58 * scale)
        .attr("y", 12 * scale)
        .attr("fill", domain.color)
        .attr("font-size", `${10.5 * scale}px`)
        .attr("font-weight", "700")
        .attr("font-family", "monospace")
        .text(`${currentMacroGroup.subcategories.length} Chủ đề  •  ${currentMacroGroup.words.length} Từ vựng`);

      // Draw Level 2 Topic Nodes
      const nodesGroup = g.append("g").attr("class", "level2-topics-layer");

      allTopicNodes.forEach((node) => {
        const isSelected = activeSubcatIndex === node.idx;
        const gTopic = nodesGroup
          .append("g")
          .attr("class", "level2-topic-card")
          .attr("transform", `translate(${node.x}, ${node.y})`)
          .style("cursor", "pointer")
          .on("click", (e) => {
            e.stopPropagation();
            handleSelectTopicFromDomain(node.idx);
          });

        gTopic
          .append("rect")
          .attr("x", -cardW / 2)
          .attr("y", -cardH / 2)
          .attr("width", cardW)
          .attr("height", cardH)
          .attr("rx", 12 * scale)
          .attr("fill", isSelected ? "#F0F9FF" : "#FFFFFF")
          .attr("stroke", isSelected ? "#2563EB" : "#CBD5E1")
          .attr("stroke-width", (isSelected ? 2.5 : 1.4) * scale)
          .attr("filter", "url(#mindmap-card-shadow)");

        // Left accent line
        gTopic
          .append("rect")
          .attr("x", -cardW / 2)
          .attr("y", -cardH / 2 + 8 * scale)
          .attr("width", 4 * scale)
          .attr("height", cardH - 16 * scale)
          .attr("rx", 2 * scale)
          .attr("fill", isSelected ? "#2563EB" : domain.color);

        // Topic Title
        const title = node.sub.category.length > 24 ? node.sub.category.slice(0, 23) + "…" : node.sub.category;
        gTopic
          .append("text")
          .attr("x", -cardW / 2 + 14 * scale)
          .attr("y", -7 * scale)
          .attr("dominant-baseline", "middle")
          .attr("fill", isSelected ? "#1E40AF" : "#0F172A")
          .attr("font-size", `${11.5 * scale}px`)
          .attr("font-weight", "800")
          .text(title);

        // Word count & CTA
        gTopic
          .append("text")
          .attr("x", -cardW / 2 + 14 * scale)
          .attr("y", 11 * scale)
          .attr("dominant-baseline", "middle")
          .attr("fill", "#64748B")
          .attr("font-size", `${10 * scale}px`)
          .attr("font-weight", "600")
          .text(`${node.sub.words.length} từ vựng  ➔  Xem bài học`);
      });
    }

    // 5. FIT AND RECENTER VIEW
    const initTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85);
    svg.call(zoom.transform, initTransform);
  }, [
    levelMode,
    currentMacroGroup,
    currentSubcategory,
    activeSubcatIndex,
    searchQuery,
    knownWords,
    inspectedWord,
    showInspector,
    scaleMultiplier,
    isFullscreen,
  ]);

  // Zoom control handlers
  const handleZoomIn = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(zoomRef.current.scaleBy, 1.25);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(zoomRef.current.scaleBy, 0.8);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && zoomRef.current && containerRef.current) {
      const inspectorWidth = inspectedWord && showInspector ? 360 : 0;
      const width = Math.max(containerRef.current.clientWidth - inspectorWidth || 800, 640);
      const height = isFullscreen ? window.innerHeight - 150 : 660;
      const transform = d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85);
      d3.select(svgRef.current).transition().duration(350).call(zoomRef.current.transform, transform);
    }
  };

  // Subcategory Stepper navigation
  const handlePrevSubcat = () => {
    if (!currentMacroGroup) return;
    const total = currentMacroGroup.subcategories.length;
    setActiveSubcatIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNextSubcat = () => {
    if (!currentMacroGroup) return;
    const total = currentMacroGroup.subcategories.length;
    setActiveSubcatIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-white border-2 border-[#0F172A] rounded-2xl shadow-sm overflow-hidden flex flex-col ${
        isFullscreen ? "fixed inset-3 z-50 shadow-2xl" : "w-full"
      }`}
    >
      {/* 1. TOP TOOLBAR: MACRO DOMAINS PILLS & 2-LEVEL MODE TOGGLE */}
      <div className="bg-[#0F172A] text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Macro Domain Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            9 Nhóm Vĩ Mô:
          </span>

          {groupedData.map((g) => {
            const isActive = activeMacroId === g.domain.id;
            return (
              <button
                key={g.domain.id}
                onClick={() => handleSelectMacro(g.domain.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-white text-slate-900 border-white shadow-md font-black ring-2 ring-blue-400/80"
                    : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{g.domain.emoji}</span>
                <span className="line-clamp-1">{g.domain.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-slate-900 text-white font-bold" : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {g.words.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-Level Mode Switcher */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-bold shrink-0">
          <button
            onClick={() => setLevelMode("topic_words")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              levelMode === "topic_words"
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-300 hover:text-white"
            }`}
            title="Chỉ hiển thị 2 cấp: Chủ đề ➔ Từ vựng học thuật"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Chủ đề ➔ Từ vựng (2 Cấp)</span>
          </button>

          <button
            onClick={() => setLevelMode("domain_topics")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              levelMode === "domain_topics"
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-300 hover:text-white"
            }`}
            title="Chỉ hiển thị 2 cấp: Nhóm vĩ mô ➔ Các chủ đề con"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nhóm lớn ➔ Các Chủ đề</span>
          </button>
        </div>
      </div>

      {/* 2. SUB-BAR: TOPIC STEPPER, SEARCH, DISPLAY SCALE & AI ACTION SHORTCUTS */}
      <div className="bg-[#F8FAFC] border-b border-gray-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Left: Active Topic Stepper / Selector */}
        {currentMacroGroup && currentMacroGroup.subcategories.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 hidden sm:inline">
              Chủ đề hiện tại:
            </span>

            <div className="flex items-center bg-white border border-gray-300 rounded-xl p-0.5 shadow-xs">
              <button
                onClick={handlePrevSubcat}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                title="Chủ đề trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <select
                value={activeSubcatIndex}
                onChange={(e) => {
                  setActiveSubcatIndex(parseInt(e.target.value, 10));
                  setLevelMode("topic_words");
                }}
                className="bg-transparent border-none px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none max-w-[240px] truncate cursor-pointer"
              >
                {currentMacroGroup.subcategories.map((sub, idx) => (
                  <option key={idx} value={idx}>
                    {idx + 1}. {sub.category} ({sub.words.length} từ)
                  </option>
                ))}
              </select>

              <button
                onClick={handleNextSubcat}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                title="Chủ đề tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Mastered Count in Topic */}
            {currentSubcategory && (
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 hidden md:inline">
                Đã thuộc: {currentSubcategory.words.filter((w) => knownWords.includes(w.id)).length}/
                {currentSubcategory.words.length} từ
              </span>
            )}
          </div>
        )}

        {/* Right: Search, Font Scaler, Zoom Controls, AI Shortcuts */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Search box */}
          <div className="relative min-w-[170px] max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Tra từ, tiếng Việt, B2..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-6 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Hide Known Toggle */}
          <button
            onClick={() => onToggleHideKnown(!hideKnown)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              hideKnown
                ? "bg-amber-50 text-amber-900 border-amber-300"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            title="Ẩn những từ bạn đã đánh dấu thuộc lòng"
          >
            {hideKnown ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5 text-gray-500" />}
            <span className="hidden lg:inline">{hideKnown ? "Đang ẩn từ đã thuộc" : "Hiện tất cả"}</span>
          </button>

          {/* Scale Buttons */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5 text-xs font-bold">
            <span className="text-gray-400 px-1.5 flex items-center gap-1 font-semibold">
              <Type className="w-3 h-3 text-blue-600" />
            </span>
            <button
              onClick={() => handleSetDisplayScale("compact")}
              className={`px-1.5 py-1 rounded transition-colors cursor-pointer ${
                displayScale === "compact" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Cỡ nhỏ (88%)"
            >
              Nhỏ
            </button>
            <button
              onClick={() => handleSetDisplayScale("normal")}
              className={`px-1.5 py-1 rounded transition-colors cursor-pointer ${
                displayScale === "normal" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Cỡ chuẩn (100%)"
            >
              Chuẩn
            </button>
            <button
              onClick={() => handleSetDisplayScale("large")}
              className={`px-1.5 py-1 rounded transition-colors cursor-pointer ${
                displayScale === "large" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Cỡ lớn (115%)"
            >
              Lớn
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomIn}
              className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              title="Phóng to"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              title="Góc nhìn chuẩn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              title={isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* AI Tutor shortcut */}
          {onOpenAiTutor && (
            <button
              onClick={() =>
                onOpenAiTutor(
                  currentSubcategory?.category,
                  currentSubcategory?.words,
                  currentMacroGroup?.domain.name
                )
              }
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1 cursor-pointer transition-all border border-blue-400/40"
              title="Mở Gia sư AI cho chủ đề này"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              <span>Gia Sư AI</span>
            </button>
          )}

          {/* AI Lesson shortcut */}
          {onOpenAiLesson && (
            <button
              onClick={() =>
                onOpenAiLesson(
                  currentSubcategory?.category,
                  inspectedWord || undefined,
                  currentMacroGroup?.domain.name
                )
              }
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1 cursor-pointer transition-all border border-amber-400/40"
              title="Tạo bài học dễ nhớ mới bằng AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Bài Học Dễ Nhớ</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. MAIN WORKSPACE: DOCKED SIDE-BY-SIDE LAYOUT (ZERO OCCLUSION!) */}
      <div className="relative flex-1 flex flex-row overflow-hidden select-none bg-gradient-to-br from-slate-50/70 via-white to-blue-50/40 min-h-[580px]">
        {/* SVG Canvas Area */}
        <div className="relative flex-1 h-full overflow-hidden">
          <svg ref={svgRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

          {/* Bottom Floating Legend / Guide */}
          <div className="absolute left-4 bottom-4 pointer-events-none bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 shadow-sm space-y-1">
            <div className="flex items-center gap-1.5 text-slate-900 font-black">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Sơ Đồ Tư Duy 2 Cấp Độ Tối Ưu:</span>
            </div>
            <div className="text-[11px] text-gray-500 space-y-0.5">
              <p>• <strong>Cấp 1 (Gốc)</strong>: Chủ đề học thuật đang chọn (Band 7.0 - 8.5).</p>
              <p>• <strong>Cấp 2 (Nhánh)</strong>: Phân nhánh đối xứng Trái - Phải rõ ràng, không che lấp.</p>
              <p>• <strong>Bấm trực tiếp</strong>: 🔊 để nghe phát âm, ✓ để đánh dấu thuộc từ.</p>
            </div>
          </div>

          {/* If Inspector is closed or minimized, show re-open button */}
          {inspectedWord && !showInspector && (
            <button
              onClick={() => setShowInspector(true)}
              className="absolute right-4 top-4 z-20 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <PanelRightOpen className="w-4 h-4 text-blue-400" />
              <span>Xem chi tiết từ "{inspectedWord.word}"</span>
            </button>
          )}
        </div>

        {/* DOCKED SIDE INSPECTOR (Sits alongside the canvas - ZERO OCCLUSION of mindmap nodes!) */}
        {inspectedWord && showInspector && (
          <div className="w-80 sm:w-96 border-l-2 border-[#0F172A] bg-white h-full overflow-y-auto shrink-0 shadow-xl flex flex-col z-20 animate-in slide-in-from-right-3 duration-200">
            {/* Docked Inspector Header */}
            <div className="bg-slate-100 border-b border-gray-200 px-3 py-2 flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1 text-slate-900">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>BẢNG CHI TIẾT TỪ VỰNG</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowInspector(false)}
                  className="p-1 hover:bg-gray-200 rounded text-gray-600 transition-colors cursor-pointer"
                  title="Thu gọn bảng chi tiết"
                >
                  <PanelRightClose className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Detailed Word Component */}
            <div className="p-3 flex-1 overflow-y-auto">
              <TopicWordDetailView
                word={inspectedWord}
                isKnown={knownWords.includes(inspectedWord.id)}
                onToggleKnown={onToggleKnown}
                onClose={() => setInspectedWord(null)}
                hasPrev={!!prevWord}
                hasNext={!!nextWord}
                onPrevWord={() => prevWord && setInspectedWord(prevWord)}
                onNextWord={() => nextWord && setInspectedWord(nextWord)}
                onOpenAiLesson={(topic, word) => {
                  if (onOpenAiLesson) onOpenAiLesson(topic, word, currentMacroGroup?.domain.name);
                }}
                onOpenAiTutor={(topic, words) => {
                  if (onOpenAiTutor) onOpenAiTutor(topic, words, currentMacroGroup?.domain.name);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
