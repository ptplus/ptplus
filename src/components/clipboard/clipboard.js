/* Data Copy
***********************************/
function clipboard() {

	const copyButtons = Array.from(document.querySelectorAll('[data-clipboard-target]'));

	copyButtons.forEach(copyButton => {
		const clipboard = new Clipboard(copyButton);

		// Success
		clipboard.on("success", () => {
			copyButton.classList.add('success'); 
			setTimeout(() => copyButton.classList.remove('success'), 3000);
		});

		// Error
		clipboard.on("error", () => {
			copyButton.classList.add('error');
			setTimeout(() => copyButton.classList.remove('error'), 3000);
		});
	});
}

/* Run Function
***********************************/
clipboard();