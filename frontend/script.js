
const form = document.getElementById("incident-form");
const submitButton = document.getElementById("submit-button");
const message = document.getElementById("message");
const result = document.getElementById("result");

function setText(id, value) {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(
            `Missing HTML element: #${id}. Check frontend/index.html`
        );
    }

    element.textContent = value;
}


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    message.textContent = "";
    result.hidden = true;
    submitButton.disabled = true;
    submitButton.textContent = "Analyzing...";

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/incidents/analyze",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            const details = Array.isArray(data.detail)
                ? data.detail.map((item) => item.msg).join(", ")
                : data.detail || "Request failed.";

            throw new Error(details);
        }

        document.getElementById("result-title").textContent =
            "Title: " + data.title;

        document.getElementById("result-description").textContent =
            "Description: " + data.description;

        document.getElementById("result-category").textContent =
            "Category: " + data.category;

        document.getElementById("category-reason").textContent =
            "Why this category? " + data.category_reason;

        document.getElementById("result-priority").textContent =
            "Priority: " + data.priority;

        document.getElementById("priority-reason").textContent =
            "Why this priority? " + data.priority_reason;

        document.getElementById("result-status").textContent =
            "Status: " + data.status;

        result.hidden = false;
        message.textContent = "Incident analyzed successfully.";

    } catch (error) {
       console.error(error);
        message.textContent =
        "Could not submit the incident. " + error.message;  
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Incident →";
    }
});
