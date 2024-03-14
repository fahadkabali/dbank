import { html, render } from 'lit-html';
import { dbank_backend } from 'declarations/dbank_backend';

async function App() {
  window.addEventListener("load", async function() {
    update();
  });

  document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length != 0) {
      await dbank_backend.topUp(inputAmount);
    }

    if (document.getElementById("withdrawal-amount").value.length != 0) {
      await dbank_backend.withdraw(outputAmount);
    }

    await dbank_backend.compound();

    update();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";

    button.removeAttribute("disabled");

  });

  async function update() {
    const currentAmount = await dbank_backend.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
  };
}

export default App();