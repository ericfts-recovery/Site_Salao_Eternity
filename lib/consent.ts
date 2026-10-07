export type ConsentState = "granted" | "denied" | "unset";

const STORAGE_KEY = "eternity-cookie-consent";
const CHANGE_EVENT = "eternity-consent-change";

function readStorage(): ConsentState {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

export function getConsent(): ConsentState {
  return typeof window === "undefined" ? "unset" : readStorage();
}

/** No servidor não sabemos a escolha: retornamos um estado neutro para não piscar o banner. */
export function getServerConsent(): ConsentState | "loading" {
  return "loading";
}

export function setConsent(value: ConsentState): void {
  try {
    if (value === "unset") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Armazenamento bloqueado (navegação privada): a escolha vale só para esta visita.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
