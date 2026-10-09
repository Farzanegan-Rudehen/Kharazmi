const dialogTriggers = document.querySelectorAll("[data-dialog-open]");
const topicDialogTitle = document.getElementById("topic-dialog-title");
const topicDialogText = document.getElementById("topic-dialog-text");
const topicDialogList = document.getElementById("topic-dialog-list");

dialogTriggers.forEach((trigger) => {
  trigger.textContent = "مشاهده";

  trigger.addEventListener("click", () => {
    const dialog = document.getElementById(trigger.dataset.dialogOpen);
    if (!dialog) return;

    if (trigger.dataset.topicTitle) {
      topicDialogTitle.textContent = trigger.dataset.topicTitle;
      topicDialogText.textContent = trigger.dataset.topicText;
      topicDialogList.replaceChildren();

      const items = trigger.dataset.topicList?.split("|").filter(Boolean) ?? [];
      items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        topicDialogList.append(listItem);
      });
      topicDialogList.hidden = items.length === 0;
    }

    dialog.showModal();
  });
});

document.querySelectorAll(".topic-card").forEach((card) => {
  const trigger = card.querySelector("[data-dialog-open]");
  if (!trigger) return;

  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `مشاهده توضیحات محور ${trigger.dataset.topicTitle}`);

  card.addEventListener("click", (event) => {
    if (event.target.closest(".topic-dialog-trigger")) return;
    trigger.click();
  });

  card.addEventListener("keydown", (event) => {
    if (event.target !== card || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    trigger.click();
  });
});

document.querySelectorAll("[data-dialog-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
