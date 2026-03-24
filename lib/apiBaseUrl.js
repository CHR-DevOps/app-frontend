const LOCALHOST_HOSTNAMES = new Set(['localhost', '127.0.0.1']);

function normalizeBaseUrl(value) {
  return value ? value.replace(/\/$/, '') : '';
}

function canUseConfiguredBaseUrl(configuredBaseUrl) {
  if (!configuredBaseUrl || typeof window === 'undefined') {
    return true;
  }

  try {
    const configuredUrl = new URL(configuredBaseUrl);
    const currentHost = window.location.hostname;

    const appIsRunningLocally = LOCALHOST_HOSTNAMES.has(currentHost);
    const configuredUrlIsLocal = LOCALHOST_HOSTNAMES.has(configuredUrl.hostname);

    // A localhost API baked into a production build breaks browser calls.
    if (!appIsRunningLocally && configuredUrlIsLocal) {
      return false;
    }
  } catch {
    return true;
  }

  return true;
}

export function getApiBaseUrl() {
  const configuredBaseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL || '');

  if (!canUseConfiguredBaseUrl(configuredBaseUrl)) {
    return '';
  }

  return configuredBaseUrl;
}
