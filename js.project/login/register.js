document.addEventListener('DOMContentLoaded', function () {
    const signUpNameInput = document.getElementById("sign-up-name");
    const signUpEmailInput = document.getElementById("sign-up-email");
    const signUpPasswordInput = document.getElementById("sign-up-password");
    const signUpButton = document.getElementById("sign-up-button");
    const errorBox = document.getElementById("sign-up-error");

    if (!signUpNameInput || !signUpEmailInput || !signUpPasswordInput || !signUpButton || !errorBox) {
        console.error("One or more form elements are missing.");
        return;
    }

    signUpButton.addEventListener("click", (e) => {
        e.preventDefault();
        signUp();
    });

    function signUp() {
        signUpButton.disabled = true;
        signUpButton.classList.add("inactive");
        const username = signUpNameInput.value;
        const email = signUpEmailInput.value;
        const password = signUpPasswordInput.value;

        try {
            if (!email.includes("@")) {
                throw new Error("Invalid email.");
            }
            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters.");
            }
        } catch (error) {
            errorBox.classList.remove("hidden");
            errorBox.firstElementChild.textContent = error.message;
            signUpButton.disabled = false;
            signUpButton.classList.remove("inactive");
            return;
        }

        const newUser = {
            username: username,
            email: email,
            password: password
        };

        // Check if users key exists in localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Add the new user to the users array
        users.push(newUser);

        // Store the updated users array in localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Post the new user to the server
        postUser(newUser);
    }

    function postUser(user) {
        fetch("https://65d6c4e3f6967ba8e3be85e9.mockapi.io/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to create user.");
                return res.json();
            })
            .then((user) => {
                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location = "../project.html";
            })
            .catch((error) => {
                errorBox.classList.remove("hidden");
                errorBox.firstElementChild.textContent = error.message;
                signUpButton.disabled = false;
                signUpButton.classList.remove("inactive");
            });
    }
});

