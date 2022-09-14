const input = document.querySelector(".loginInput")
const button = document.querySelector(".loginBtn")
const form = document.querySelector(".loginForm")

//function to accept only names with more than 3 characters, if it has, release the button
const validadeInput = ({target}) => {
  if (target.value.length > 3) {
    button.removeAttribute("disabled")
    return
  }

  button.setAttribute("disabled", "")
}

//function to handle the form submission and send the user to the game page
const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem("player", input.value)
  window.location = "pages/game.html"
}

input.addEventListener("input", validadeInput)
form.addEventListener("submit", handleSubmit)