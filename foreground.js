function show_output() {
    let output_outer_box;
    output_outer_box = document.createElement("div");
    const output_inner_box = document.createElement("div");
    const output_exit = document.createElement("div");
    const output_main_box = document.createElement("div");
    const output_buttons = document.createElement("div");
    const output_exit_link = document.createElement("a");
    const xmark = document.createElement("img");
    const redo_btn = document.createElement("div");
    const redo_btn_text = document.createElement("span");
    const redo_btn_icon = document.createElement("img");
    const copy_btn = document.createElement("div");

    output_outer_box.id = "output_outer_box";
    output_inner_box.id = "output_inner_box";
    output_exit.id = 'output_exit';
    output_exit_link.id = "output_exit_link";
    xmark.id = "xmark";
    output_main_box.id = 'output_main_box';
    output_buttons.id = 'output_buttons';
    redo_btn.id = 'redo_btn';
    redo_btn_icon.id = 'redo_btn_icon';
    copy_btn.id = 'copy_btn';

    xmark.src = chrome.runtime.getURL("./static/icons/Close_Grey.png");
    redo_btn_icon.src = chrome.runtime.getURL("./static/icons/OCR_Black.png");

    redo_btn_text.innerHTML = 'Select again&nbsp;&nbsp;';
    redo_btn.appendChild(redo_btn_text);
    redo_btn.appendChild(redo_btn_icon);
    copy_btn.innerText = "Copy text";

    output_outer_box.appendChild(output_inner_box);
    output_outer_box.appendChild(output_buttons);

    output_inner_box.appendChild(output_exit);
    output_inner_box.appendChild(output_main_box);

    output_exit.appendChild(output_exit_link);
    output_exit_link.appendChild(xmark);

    output_buttons.appendChild(redo_btn);
    output_buttons.appendChild(copy_btn);

    document.querySelector('body').appendChild(output_outer_box);

    chrome.runtime.sendMessage({
        message: "show_output_on_foreground"
    }, response => {
        if (response.message === 'shown_output_on_foreground_successfully') {
            let wait_main = document.getElementById('wait_main');
            document.querySelector('body').removeChild(wait_main);
            output_main_box.innerText = response.payload;
        }
    });

    redo_btn.addEventListener('click', () => {
        document.querySelector('body').removeChild(output_outer_box);
        window.setTimeout(() => {
            chrome.runtime.sendMessage({
                message: "redo"
            }, () => { });
        }, 100);
    })

    copy_btn.addEventListener('click', () => {
        const cb = navigator.clipboard;
        cb.writeText(output_main_box.innerText).then(() => cb.writeText(output_main_box.innerText).then(() => copy_btn.innerText = 'Text Copied'));
    })

    xmark.addEventListener('click', () => {
        document.querySelector('body').removeChild(output_outer_box);
    })
}

show_output();
