import { UserProfile } from "../types";

const PROFILES_STORAGE_KEY = "ielts_user_profiles_v2";
const ACTIVE_PROFILE_ID_KEY = "ielts_active_profile_id_v2";

export const DEFAULT_PROFILE: UserProfile = {
  id: "user_default",
  name: "Học viên IELTS",
  avatarEmoji: "🎓",
  hasPassword: false,
  targetBand: "7.5",
  createdAt: Date.now(),
  lastActiveAt: Date.now(),
};

/**
 * Simple robust hash for client-side profile protection
 */
export function hashPassword(pwd: string): string {
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "h_" + Math.abs(hash).toString(36) + "_" + btoa(encodeURIComponent(pwd)).slice(0, 16);
}

/**
 * Retrieve all registered user profiles
 */
export function getAllProfiles(): UserProfile[] {
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (!raw) {
      // Initialize with default profile
      const initial = [DEFAULT_PROFILE];
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [DEFAULT_PROFILE];
  } catch (e) {
    console.error("Error reading profiles:", e);
    return [DEFAULT_PROFILE];
  }
}

/**
 * Save profiles list to storage
 */
function persistProfiles(profiles: UserProfile[]): void {
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.error("Error persisting profiles:", e);
  }
}

/**
 * Get the currently active profile
 */
export function getActiveProfile(): UserProfile {
  const profiles = getAllProfiles();
  const activeId = localStorage.getItem(ACTIVE_PROFILE_ID_KEY);
  if (activeId) {
    const found = profiles.find((p) => p.id === activeId);
    if (found) return found;
  }
  // Default to first profile
  const fallback = profiles[0] || DEFAULT_PROFILE;
  localStorage.setItem(ACTIVE_PROFILE_ID_KEY, fallback.id);
  return fallback;
}

/**
 * Notify all listeners across the window that profile changed
 */
export function emitProfileChangeEvent(profile: UserProfile): void {
  try {
    window.dispatchEvent(
      new CustomEvent("ielts-profile-changed", {
        detail: { profile },
      })
    );
  } catch (e) {
    console.error("Error emitting profile change:", e);
  }
}

/**
 * Verify profile password
 */
export function verifyProfilePassword(profileId: string, inputPassword: string): boolean {
  const profiles = getAllProfiles();
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) return false;
  if (!profile.hasPassword) return true;
  if (!profile.passwordHash) return true;
  return profile.passwordHash === hashPassword(inputPassword.trim());
}

/**
 * Switch active profile (caller must verify password first if hasPassword is true)
 */
export function switchActiveProfile(profileId: string): boolean {
  const profiles = getAllProfiles();
  const target = profiles.find((p) => p.id === profileId);
  if (!target) return false;

  target.lastActiveAt = Date.now();
  persistProfiles(profiles);

  localStorage.setItem(ACTIVE_PROFILE_ID_KEY, target.id);
  emitProfileChangeEvent(target);
  return true;
}

/**
 * Create a new user profile
 */
export function createProfile(
  name: string,
  password?: string,
  avatarEmoji: string = "🎓",
  targetBand: string = "7.5"
): UserProfile {
  const profiles = getAllProfiles();
  const cleanName = name.trim() || `Học viên ${profiles.length + 1}`;
  const hasPass = Boolean(password && password.trim().length > 0);

  const newProfile: UserProfile = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: cleanName,
    avatarEmoji: avatarEmoji || "🎓",
    hasPassword: hasPass,
    passwordHash: hasPass && password ? hashPassword(password.trim()) : undefined,
    targetBand: targetBand || "7.5",
    createdAt: Date.now(),
    lastActiveAt: Date.now(),
  };

  profiles.push(newProfile);
  persistProfiles(profiles);

  // Switch to new profile automatically
  localStorage.setItem(ACTIVE_PROFILE_ID_KEY, newProfile.id);
  emitProfileChangeEvent(newProfile);

  return newProfile;
}

/**
 * Update an existing profile (name, avatar, band, or password)
 */
export function updateProfile(
  profileId: string,
  updates: {
    name?: string;
    avatarEmoji?: string;
    targetBand?: string;
    newPassword?: string;
    removePassword?: boolean;
  }
): UserProfile | null {
  const profiles = getAllProfiles();
  const index = profiles.findIndex((p) => p.id === profileId);
  if (index === -1) return null;

  const target = profiles[index];

  if (updates.name !== undefined) {
    target.name = updates.name.trim() || target.name;
  }
  if (updates.avatarEmoji !== undefined) {
    target.avatarEmoji = updates.avatarEmoji;
  }
  if (updates.targetBand !== undefined) {
    target.targetBand = updates.targetBand;
  }

  if (updates.removePassword) {
    target.hasPassword = false;
    delete target.passwordHash;
  } else if (updates.newPassword && updates.newPassword.trim().length > 0) {
    target.hasPassword = true;
    target.passwordHash = hashPassword(updates.newPassword.trim());
  }

  target.lastActiveAt = Date.now();
  profiles[index] = target;
  persistProfiles(profiles);

  const active = getActiveProfile();
  if (active.id === profileId) {
    emitProfileChangeEvent(target);
  }

  return target;
}

/**
 * Delete a user profile (cannot delete if only 1 profile remains)
 */
export function deleteProfile(profileId: string): boolean {
  const profiles = getAllProfiles();
  if (profiles.length <= 1) {
    return false; // Prevent deleting last remaining profile
  }

  const filtered = profiles.filter((p) => p.id !== profileId);
  persistProfiles(filtered);

  const active = getActiveProfile();
  if (active.id === profileId) {
    // Switch to first remaining profile
    const next = filtered[0];
    localStorage.setItem(ACTIVE_PROFILE_ID_KEY, next.id);
    emitProfileChangeEvent(next);
  }

  return true;
}

/**
 * Helper to subscribe to profile changes
 */
export function subscribeToProfileChange(callback: (profile: UserProfile) => void): () => void {
  const handler = (event: Event) => {
    const custom = event as CustomEvent<{ profile: UserProfile }>;
    if (custom.detail?.profile) {
      callback(custom.detail.profile);
    } else {
      callback(getActiveProfile());
    }
  };

  window.addEventListener("ielts-profile-changed", handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener("ielts-profile-changed", handler);
    window.removeEventListener("storage", handler);
  };
}
