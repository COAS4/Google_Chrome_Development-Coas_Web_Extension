function waiting() {
    const wait_main = document.createElement("div");
    const wait_sub = document.createElement("div");
    const wait_loader = document.createElement("div");
    const wait_message = document.createElement("div");
    const wait_stuck = document.createElement("div");
    const wait_stuck_line1 = document.createElement("div");
    const wait_stuck_line2 = document.createElement("div");

    wait_main.id = "wait_main";
    wait_sub.id = "wait_sub";
    wait_loader.id = "wait_loader";
    wait_message.id = "wait_message";
    wait_stuck.id = "wait_stuck";
    wait_stuck_line1.id = "wait_stuck_line1";
    wait_stuck_line2.id = "wait_stuck_line2";

    wait_message.innerText = "Processing....";
    wait_stuck_line1.innerText = "A FEW MOMENTS PLEASE";
    wait_stuck_line2.innerText = "DO NOT SWITCH TABS (OR) REFRESH THE PAGE";

    wait_main.appendChild(wait_sub);
    wait_sub.appendChild(wait_loader);
    wait_sub.appendChild(wait_message);
    wait_stuck.appendChild(wait_stuck_line1);
    wait_stuck.appendChild(wait_stuck_line2);
    wait_main.appendChild(wait_stuck);

    document.querySelector('body').appendChild(wait_main);
}

waiting();


