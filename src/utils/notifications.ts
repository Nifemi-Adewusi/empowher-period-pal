export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const showNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      icon: "/icon-192x192.png",
      badge: "/icon-192x192.png",
      ...options,
    });
  }
};

export const scheduleCheckIn = () => {
  const savedSettings = localStorage.getItem("notification_settings");
  const settings = savedSettings ? JSON.parse(savedSettings) : { enabled: false, time: "09:00" };

  if (!settings.enabled) return;

  const now = new Date();
  const [hours, minutes] = settings.time.split(":");
  const scheduledTime = new Date();
  scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  // If the time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    const messages = [
      "How are you feeling today? 💖",
      "Time for your daily check-in! ✨",
      "Let's track your wellness journey 🌸",
      "Ready to log how you're feeling? 💜",
      "Your daily reminder to check in with yourself 🌟",
      "Take a moment for self-care today! 🦋",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    showNotification("EmpowHer Check-In", {
      body: randomMessage,
      tag: "daily-checkin",
      requireInteraction: false,
    });

    // Schedule the next one for tomorrow
    scheduleCheckIn();
  }, timeUntilNotification);
};

export const getNotificationSettings = () => {
  const saved = localStorage.getItem("notification_settings");
  if (saved) {
    return JSON.parse(saved);
  }
  return { enabled: false, time: "09:00" };
};

export const saveNotificationSettings = (settings: { enabled: boolean; time: string }) => {
  localStorage.setItem("notification_settings", JSON.stringify(settings));
  
  // Restart the scheduling
  if (settings.enabled) {
    scheduleCheckIn();
  }
};
