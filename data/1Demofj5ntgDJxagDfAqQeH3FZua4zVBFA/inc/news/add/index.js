let loadFile = () => {
	return new Promise((resolve, reject) => {
		let fileSelect = document.createElement("input");
		fileSelect.type = "file";
		fileSelect.onchange = () => {
			let fileReader = new FileReader();
			fileReader.onload = () => {
				let binary = fileReader.result;

				fileReader.readAsDataURL(fileSelect.files[0]);
				fileReader.onload = () => {
					let dataUrl = fileReader.result;

					resolve({
						name: fileSelect.files[0].name,
						binary: binary,
						dataUrl: dataUrl
					});
				};
			};
			fileReader.readAsBinaryString(fileSelect.files[0]);
		};
		fileSelect.click();
	});
};

let postNode = document.getElementById("add_news_post");
let postImage = document.getElementById("add_news_image");
let postContent = document.getElementById("add_content");
let postPublish = document.getElementById("add_publish");

let imageFile = null;

postNode.onclick = () => {
	loadFile()
		.then(file => {
			imageFile = file;
			postImage.style.backgroundImage = "url(" + imageFile.dataUrl + ")";
		});
};

let publishing = false;

postContent.onclick = () => {
	postPublish.classList.remove("error");
	postPublish.innerHTML = "Publish";
};

postPublish.onclick = () => {
	if(publishing) {
		return;
	}

	if(/^\s*$/.test(postContent.value)) {
		postPublish.classList.add("error");
		postPublish.innerHTML = "Please, fill content in";
		return;
	}

	publishing = true;
	postPublish.classList.add("publishing");
	postPublish.innerHTML = "Publishing...";

	Posts.add("news", "news", "", {
		content: postContent.value,
		picture: imageFile,
		dateAdded: Date.now()
	}).then(() => {
		postPublish.innerHTML = "Published";

		location.href = "?/";
	}, e => {
		publishing = false;
		postPublish.classList.remove("publishing");
		postPublish.classList.add("error");
		postPublish.innerHTML = e;
	});
};