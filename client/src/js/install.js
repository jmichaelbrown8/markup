const butInstall = document.getElementById("buttonInstall");

// Check onload to see if the app is supported
window.addEventListener("load", () => {
  if (!installSupported()) {
    console.log("Install is not supported");
    hideInstallButton();
    return;
  }

  console.log("Install is supported");
  // Handle install available
  window.addEventListener("beforeinstallprompt", (event) => {
    // Store the triggered events
    window.deferredPrompt = event;
    showInstallButton(event);
  });

  // Handle user request to install
  butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
      return;
    }

    // Show prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;
  });

  // Hide the install button
  window.addEventListener("appinstalled", (event) => {
    hideInstallButton();

    // Clear prompt
    window.deferredPrompt = null;
  });
});

/** Checks to see if install is supported in browser */
function installSupported() {
  return "getInstalledRelatedApps" in navigator;
}

/** Show the install button */
function showInstallButton(event) {
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
  // divInstallStatus.textContent = 'true';
  // btnAdd.removeAttribute('disabled');
}

/** Hide the install button */
function hideInstallButton() {
  // add the hidden class to the button.
  butInstall.classList.toggle("hidden", true);
}
