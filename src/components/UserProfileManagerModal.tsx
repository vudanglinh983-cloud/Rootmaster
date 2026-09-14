import React, { useState, useEffect } from "react";
import {
  UserProfile,
} from "../types";
import {
  getAllProfiles,
  getActiveProfile,
  switchActiveProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  verifyProfilePassword,
} from "../lib/profileStorage";
import { getAllSavedLessons } from "../lib/lessonStorage";
import {
  User,
  Users,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  Plus,
  Check,
  Trash2,
  Edit3,
  X,
  Eye,
  EyeOff,
  BookmarkCheck,
  AlertCircle,
} from "lucide-react";

interface UserProfileManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSwitched?: (newProfile: UserProfile) => void;
}

const AVAILABLE_AVATARS = [
  "🎓", "🦁", "🦉", "💡", "🚀", 
  "🌟", "🎯", "⚡", "🦊", "🏆", 
  "📚", "☕", "🔬", "🪐", "🎨"
];

const BAND_TARGETS = ["6.5", "7.0", "7.5", "8.0", "8.5", "9.0+"];

export const UserProfileManagerModal: React.FC<UserProfileManagerModalProps> = ({
  isOpen,
  onClose,
  onProfileSwitched,
}) => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeProfile, setActiveProfileState] = useState<UserProfile>(getActiveProfile());
  const [activeTab, setActiveTab] = useState<"switch" | "create" | "edit">("switch");

  // Switch password challenge state
  const [challengingProfileId, setChallengingProfileId] = useState<string | null>(null);
  const [challengePassword, setChallengePassword] = useState<string>("");
  const [challengeError, setChallengeError] = useState<string | null>(null);
  const [showChallengePassword, setShowChallengePassword] = useState<boolean>(false);

  // Create profile form state
  const [newName, setNewName] = useState<string>("");
  const [newAvatar, setNewAvatar] = useState<string>("🎓");
  const [newBand, setNewBand] = useState<string>("7.5");
  const [enableNewPassword, setEnableNewPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Edit active profile form state
  const [editName, setEditName] = useState<string>("");
  const [editAvatar, setEditAvatar] = useState<string>("🎓");
  const [editBand, setEditBand] = useState<string>("7.5");
  const [editPasswordMode, setEditPasswordMode] = useState<"none" | "set" | "remove">("none");
  const [editNewPassword, setEditNewPassword] = useState<string>("");
  const [editPasswordConfirm, setEditPasswordConfirm] = useState<string>("");
  const [showEditPassword, setShowEditPassword] = useState<boolean>(false);
  const [editSuccessMsg, setEditSuccessMsg] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  const refreshData = () => {
    const list = getAllProfiles();
    const active = getActiveProfile();
    setProfiles(list);
    setActiveProfileState(active);
    setEditName(active.name);
    setEditAvatar(active.avatarEmoji);
    setEditBand(active.targetBand || "7.5");
    setEditPasswordMode("none");
    setEditNewPassword("");
    setEditPasswordConfirm("");
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
      setChallengingProfileId(null);
      setChallengePassword("");
      setChallengeError(null);
      setCreateError(null);
      setEditSuccessMsg(null);
      setEditError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle switching to a profile
  const handleSelectProfile = (targetProfile: UserProfile) => {
    if (targetProfile.id === activeProfile.id) return;

    if (targetProfile.hasPassword) {
      // Prompt for password
      setChallengingProfileId(targetProfile.id);
      setChallengePassword("");
      setChallengeError(null);
      setShowChallengePassword(false);
    } else {
      // Direct switch
      switchActiveProfile(targetProfile.id);
      setActiveProfileState(targetProfile);
      refreshData();
      if (onProfileSwitched) onProfileSwitched(targetProfile);
    }
  };

  // Confirm password for locked profile
  const handleConfirmChallenge = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!challengingProfileId) return;

    const isValid = verifyProfilePassword(challengingProfileId, challengePassword);
    if (!isValid) {
      setChallengeError("Mật khẩu không chính xác. Vui lòng thử lại!");
      return;
    }

    // Success switch
    switchActiveProfile(challengingProfileId);
    const updatedActive = getActiveProfile();
    setActiveProfileState(updatedActive);
    setChallengingProfileId(null);
    setChallengePassword("");
    setChallengeError(null);
    refreshData();
    if (onProfileSwitched) onProfileSwitched(updatedActive);
  };

  // Create new profile
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    const trimmedName = newName.trim();
    if (!trimmedName) {
      setCreateError("Vui lòng nhập tên người học.");
      return;
    }

    if (enableNewPassword) {
      if (!newPassword.trim()) {
        setCreateError("Vui lòng nhập mật khẩu hoặc bỏ chọn đặt mật khẩu.");
        return;
      }
      if (newPassword !== newPasswordConfirm) {
        setCreateError("Mật khẩu xác nhận không trùng khớp.");
        return;
      }
    }

    const created = createProfile(
      trimmedName,
      enableNewPassword ? newPassword : undefined,
      newAvatar,
      newBand
    );

    // Reset form
    setNewName("");
    setNewPassword("");
    setNewPasswordConfirm("");
    setEnableNewPassword(false);
    setActiveTab("switch");
    refreshData();

    if (onProfileSwitched) onProfileSwitched(created);
  };

  // Save changes to active profile
  const handleSaveEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditSuccessMsg(null);

    const trimmedName = editName.trim();
    if (!trimmedName) {
      setEditError("Tên người học không được để trống.");
      return;
    }

    if (editPasswordMode === "set") {
      if (!editNewPassword.trim()) {
        setEditError("Vui lòng nhập mật khẩu mới.");
        return;
      }
      if (editNewPassword !== editPasswordConfirm) {
        setEditError("Mật khẩu xác nhận không trùng khớp.");
        return;
      }
    }

    updateProfile(activeProfile.id, {
      name: trimmedName,
      avatarEmoji: editAvatar,
      targetBand: editBand,
      newPassword: editPasswordMode === "set" ? editNewPassword : undefined,
      removePassword: editPasswordMode === "remove",
    });

    setEditSuccessMsg("Đã cập nhật thông tin hồ sơ thành công!");
    refreshData();
    setTimeout(() => {
      setEditSuccessMsg(null);
    }, 2500);
  };

  // Delete profile
  const handleDeleteProfile = (profileId: string, name: string) => {
    if (profiles.length <= 1) {
      alert("Bạn không thể xóa hồ sơ duy nhất còn lại.");
      return;
    }
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa hồ sơ của "${name}" không? Các bài học riêng biệt của hồ sơ này sẽ không còn hiển thị.`
    );
    if (!confirmed) return;

    deleteProfile(profileId);
    refreshData();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between border-b border-blue-800/40">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-xl shadow-inner">
              {activeProfile.avatarEmoji || "🎓"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                  CÁ NHÂN HÓA NGƯỜI HỌC
                </h2>
                {activeProfile.hasPassword ? (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Có mật khẩu
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono font-bold flex items-center gap-1">
                    <Unlock className="w-3 h-3" /> Tự do
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Đang học với tư cách: <span className="text-sky-300 font-bold">{activeProfile.name}</span> • Mục tiêu Band {activeProfile.targetBand || "7.5"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab("switch");
              setChallengingProfileId(null);
            }}
            className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer border-t border-x flex items-center gap-2 ${
              activeTab === "switch"
                ? "bg-white text-blue-600 border-slate-200 -mb-px font-black shadow-xs"
                : "text-slate-600 border-transparent hover:text-slate-900"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Danh Sách Người Học ({profiles.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("create");
              setChallengingProfileId(null);
            }}
            className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer border-t border-x flex items-center gap-2 ${
              activeTab === "create"
                ? "bg-white text-blue-600 border-slate-200 -mb-px font-black shadow-xs"
                : "text-slate-600 border-transparent hover:text-slate-900"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Người Học Mới</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("edit");
              setChallengingProfileId(null);
            }}
            className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer border-t border-x flex items-center gap-2 ${
              activeTab === "edit"
                ? "bg-white text-blue-600 border-slate-200 -mb-px font-black shadow-xs"
                : "text-slate-600 border-transparent hover:text-slate-900"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Chỉnh Sửa Hồ Sơ Này</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: SWITCH PROFILE */}
          {activeTab === "switch" && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-xs text-blue-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Không gian học tập hoàn toàn tách biệt:</p>
                  <p className="text-blue-700 mt-0.5">
                    Mỗi người học sở hữu riêng danh sách bài học đã lưu, ghi chú, tiến độ ôn tập và từ vựng đã thành thạo mà không bị lẫn lộn.
                  </p>
                </div>
              </div>

              {/* Password Challenge Modal / Box if challenging */}
              {challengingProfileId && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-xs text-amber-950 uppercase tracking-wider">
                        YÊU CẦU MẬT KHẨU TRUY CẬP
                      </span>
                    </div>
                    <button
                      onClick={() => setChallengingProfileId(null)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                  <p className="text-xs text-slate-700">
                    Hồ sơ của{" "}
                    <span className="font-black text-slate-900">
                      {profiles.find((p) => p.id === challengingProfileId)?.name}
                    </span>{" "}
                    được cài đặt mật khẩu bảo vệ riêng tư. Vui lòng nhập mật khẩu để mở khóa:
                  </p>

                  <form onSubmit={handleConfirmChallenge} className="space-y-3">
                    <div className="relative">
                      <input
                        type={showChallengePassword ? "text" : "password"}
                        value={challengePassword}
                        onChange={(e) => {
                          setChallengePassword(e.target.value);
                          setChallengeError(null);
                        }}
                        placeholder="Nhập mật khẩu hồ sơ..."
                        autoFocus
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowChallengePassword(!showChallengePassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showChallengePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {challengeError && (
                      <p className="text-xs text-red-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {challengeError}
                      </p>
                    )}

                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setChallengingProfileId(null)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                      >
                        Mở Khóa & Vào Học
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Profiles List */}
              <div className="grid grid-cols-1 gap-3">
                {profiles.map((p) => {
                  const isActive = p.id === activeProfile.id;
                  const lessonsCount = getAllSavedLessons(p.id).length;

                  return (
                    <div
                      key={p.id}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isActive
                          ? "bg-blue-50/70 border-blue-400 shadow-xs ring-2 ring-blue-500/20"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                          {p.avatarEmoji || "🎓"}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-black text-slate-900 truncate">
                              {p.name}
                            </span>
                            {p.hasPassword ? (
                              <span
                                className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1 border border-amber-200"
                                title="Hồ sơ được bảo vệ bằng mật khẩu"
                              >
                                <Lock className="w-2.5 h-2.5 text-amber-700" />
                                <span>Khóa</span>
                              </span>
                            ) : (
                              <span
                                className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center gap-1 border border-slate-200"
                                title="Không cần mật khẩu"
                              >
                                <Unlock className="w-2.5 h-2.5 text-slate-500" />
                                <span>Mở</span>
                              </span>
                            )}
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold font-mono">
                                Đang chọn
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                            <span className="flex items-center gap-1">
                              <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
                              <strong className="text-slate-800">{lessonsCount}</strong> bài học đã lưu
                            </span>
                            <span>•</span>
                            <span>Mục tiêu Band <strong className="text-slate-800">{p.targetBand || "7.5"}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {!isActive ? (
                          <button
                            onClick={() => handleSelectProfile(p)}
                            className="px-3.5 py-2 rounded-xl bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                          >
                            {p.hasPassword ? <Lock className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                            <span>Chọn học</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveTab("edit")}
                            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                            <span>Sửa</span>
                          </button>
                        )}

                        {profiles.length > 1 && !isActive && (
                          <button
                            onClick={() => handleDeleteProfile(p.id, p.name)}
                            title="Xóa hồ sơ này"
                            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CREATE NEW PROFILE */}
          {activeTab === "create" && (
            <form onSubmit={handleCreateProfile} className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Tên người học *
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ví dụ: Minh Anh, Tuấn, Alex..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Avatar Picker */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Biểu tượng đại diện (Avatar)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_AVATARS.map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => setNewAvatar(emoji)}
                        className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer border ${
                          newAvatar === emoji
                            ? "bg-blue-100 border-blue-500 scale-110 shadow-xs"
                            : "bg-white border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Band */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Mục tiêu điểm số IELTS (Target Band)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BAND_TARGETS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setNewBand(b)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          newBand === b
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Band {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Password Switch */}
                <div className="pt-2 border-t border-slate-200">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={enableNewPassword}
                      onChange={(e) => setEnableNewPassword(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-xs font-black text-slate-800">
                        Đặt mật khẩu bảo vệ cho hồ sơ này (Tùy chọn)
                      </span>
                    </div>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 pl-6">
                    Nếu để trống / không chọn, bạn có thể chuyển hồ sơ ngay mà không cần nhập mật khẩu.
                  </p>

                  {enableNewPassword && (
                    <div className="mt-3 pl-6 space-y-3 bg-white p-3.5 rounded-xl border border-blue-100">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Mật khẩu mới
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nhập mật khẩu hoặc mã PIN..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Xác nhận mật khẩu
                        </label>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPasswordConfirm}
                          onChange={(e) => setNewPasswordConfirm(e.target.value)}
                          placeholder="Nhập lại mật khẩu..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {createError && (
                <p className="text-xs text-red-600 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  {createError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("switch")}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tạo Hồ Sơ & Bắt Đầu Học</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: EDIT ACTIVE PROFILE */}
          {activeTab === "edit" && (
            <form onSubmit={handleSaveEditProfile} className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Tên hiển thị người học
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Biểu tượng đại diện (Avatar)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_AVATARS.map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => setEditAvatar(emoji)}
                        className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer border ${
                          editAvatar === emoji
                            ? "bg-blue-100 border-blue-500 scale-110 shadow-xs"
                            : "bg-white border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Mục tiêu Band điểm IELTS
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BAND_TARGETS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setEditBand(b)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          editBand === b
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Band {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Password Setting / Removal */}
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-blue-600" />
                      Mật khẩu bảo vệ hồ sơ
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {activeProfile.hasPassword ? "Đang có mật khẩu 🔒" : "Chưa đặt mật khẩu (Mở)"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {activeProfile.hasPassword ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setEditPasswordMode(editPasswordMode === "set" ? "none" : "set")}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            editPasswordMode === "set"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Đổi mật khẩu mới
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditPasswordMode(editPasswordMode === "remove" ? "none" : "remove")}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            editPasswordMode === "remove"
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-white text-red-600 border-red-200 hover:bg-red-50"
                          }`}
                        >
                          Gỡ bỏ mật khẩu
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditPasswordMode(editPasswordMode === "set" ? "none" : "set")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          editPasswordMode === "set"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        + Đặt mật khẩu bảo vệ
                      </button>
                    )}
                  </div>

                  {editPasswordMode === "set" && (
                    <div className="space-y-3 bg-white p-3.5 rounded-xl border border-blue-100 mt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Mật khẩu mới
                        </label>
                        <div className="relative">
                          <input
                            type={showEditPassword ? "text" : "password"}
                            value={editNewPassword}
                            onChange={(e) => setEditNewPassword(e.target.value)}
                            placeholder="Nhập mật khẩu mới..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowEditPassword(!showEditPassword)}
                            className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showEditPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Xác nhận lại mật khẩu
                        </label>
                        <input
                          type={showEditPassword ? "text" : "password"}
                          value={editPasswordConfirm}
                          onChange={(e) => setEditPasswordConfirm(e.target.value)}
                          placeholder="Nhập lại mật khẩu..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {editPasswordMode === "remove" && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-800">
                      Mật khẩu sẽ bị gỡ bỏ khi bạn nhấn "Lưu Thay Đổi". Sau đó bất kỳ ai cũng có thể vào hồ sơ này mà không cần mật khẩu.
                    </div>
                  )}
                </div>
              </div>

              {editError && (
                <p className="text-xs text-red-600 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  {editError}
                </p>
              )}

              {editSuccessMsg && (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <Check className="w-4 h-4" />
                  {editSuccessMsg}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu Thay Đổi Hồ Sơ</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
