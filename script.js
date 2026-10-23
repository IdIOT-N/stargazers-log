const repositoryList = document.querySelector("#repositories");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const events = await response.json();
    if (!Array.isArray(events)) {
      throw new Error("Repository data must be a list.");
    }

    repositoryList.replaceChildren();
    if (events.length === 0) {
      repositoryList.innerHTML = '<li class="message">No starred repositories yet.</li>';
      return;
    }

    for (const event of events) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = event.url;
      link.textContent = event.repository;

      const description = document.createElement("p");
      description.className = "description";
      description.textContent = event.description;

      const date = document.createElement("p");
      date.className = "starred-date";
      date.textContent = `Starred on ${event.starred_at}`;

      item.append(link, description, date);
      repositoryList.append(item);
    }
  } catch (error) {
    console.error("Unable to load starred repositories:", error);
    repositoryList.replaceChildren();
    const message = document.createElement("li");
    message.className = "message";
    message.textContent = "Starred repositories could not be loaded.";
    repositoryList.append(message);
  } finally {
    repositoryList.setAttribute("aria-busy", "false");
  }
}

loadRepositories();
