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

let postNode = document.getElementById("add_post");
let postName = document.getElementById("add_name");
let postBy = document.getElementById("add_by");
let postByGroup = document.getElementById("add_bygroup");
let postImage = document.getElementById("add_post_image");
let postShow = document.getElementById("add_show");
let postUpload = document.getElementById("add_post_upload");
let postDay = document.getElementById("add_day");
let postMonth = document.getElementById("add_month");
let postYear = document.getElementById("add_year");
let postPublish = document.getElementById("add_publish");

let imageFile = null;
let uploadedFile = null;
let publishing = false;

function showEmptyImage(postNode, postImage) {
	let pageInputs = {};

	Array.prototype.slice.call(
		postNode.getElementsByClassName("add-pageinput")
	).forEach(input => {
		if(input.type == "number") {
			pageInputs[input.name] = input.value ? parseInt(input.value) : null;
		} else {
			pageInputs[input.name] = input.value || null;
		}
	});

	postImage.style.backgroundImage = Pages.pages[args.page].sections[args.section].emptyImageFileHandler(pageInputs);
}

let emptyImageFileAllowed = Pages.pages[args.page].sections[args.section].emptyImageFileAllowed;
if(emptyImageFileAllowed) {
	showEmptyImage(postNode, postImage);
}

postNode.onclick = e => {
	postPublish.classList.remove("error");
	postPublish.innerHTML = "Publish";

	if(emptyImageFileAllowed && !imageFile) {
		showEmptyImage(postNode, postImage);
	}

	e.preventDefault();
	e.stopPropagation();

	if(
		e.target != postNode &&
		!e.target.classList.contains("post-cover") &&
		!e.target.classList.contains("add-image")
	) {
		return;
	}

	loadFile()
		.then(file => {
			imageFile = file;

			postImage.style.backgroundImage = "url(" + imageFile.dataUrl + ")";
		});
};

postUpload.onclick = e => {
	loadFile()
		.then(file => {
			uploadedFile = file;

			postUpload.innerHTML = "Upload (" + uploadedFile.name + ")";
		});

	postPublish.classList.remove("error");
	postPublish.innerHTML = "Publish";

	e.preventDefault();
	e.stopPropagation();
};

let showPublishError = err => {
	postPublish.classList.add("error");
	postPublish.innerHTML = err;
};

let load = () => {
	if(!args.edit) {
		return Promise.resolve();
	}

	return Posts.gatherOne(args.page, args.section, "", args.id)
		.then(post => {
			let pageInputs = {};

			Array.prototype.slice.call(
				postNode.getElementsByClassName("add-pageinput")
			).forEach(input => {
				input.value = post[input.name] === null ? "" : post[input.name];
			});

			let dateAdded = new Date(post.dateAdded);

			postDay.value = dateAdded.getDate();
			postMonth.value = dateAdded.getMonth() + 1;
			postYear.value = dateAdded.getFullYear();

			postName.value = post.name;
			postBy.value = post.by || "";
			postByGroup.value = post.bygroup || "";

			uploadedFile = post.downloadLink ? {
				name: post.downloadLink.split("/").slice(-1)[0],
				binary: "",
				dataUrl: ""
			} : null;
			if(uploadedFile) {
				postUpload.innerHTML = "Upload (" + uploadedFile.name + ")";
			}

			imageFile = post.picture ? {
				name: post.picture.split("/").slice(-1)[0],
				binary: "",
				dataUrl: post.picture
			} : null;
			if(imageFile) {
				postImage.style.backgroundImage = "url(" + imageFile.dataUrl + ")";
			}
		});
};

load()
	.then(() => {
		postPublish.onclick = () => {
			postPublish.classList.remove("error");
			postPublish.innerHTML = "Publish";

			if(!postName.value) {
				showPublishError("Please, fill name in");
				return;
			} else if(!imageFile && !emptyImageFileAllowed) {
				showPublishError("Please, add image");
				return;
			} else if(!uploadedFile) {
				showPublishError("Please, upload archive");
				return;
			} else if(!/\.zip$/.test(uploadedFile.name)) {
				showPublishError("Uploaded file should be in ZIP format");
				return;
			} else if(!/^\d+$/.test(postDay.value) || parseInt(postDay) < 1) {
				showPublishError("Wrong date format");
				return;
			} else if(!/^\d+$/.test(postMonth.value) || parseInt(postMonth) < 1) {
				showPublishError("Wrong date format");
				return;
			} else if(!/^\d+$/.test(postYear.value)) {
				showPublishError("Wrong date format");
				return;
			}

			if(publishing) {
				return;
			}

			let pageInputs = {};
			let error = false;

			Array.prototype.slice.call(
				postNode.getElementsByClassName("add-pageinput")
			).forEach(input => {
				if(input.type == "number") {
					if(input.value && !/^\d+$/.test(input.value)) {
						showPublishError(input.placeholder + " should be number");
						error = true;
						return;
					}

					pageInputs[input.name] = input.value ? parseInt(input.value) : null;
				} else {
					pageInputs[input.name] = input.value || null;
				}
			});

			if(error) {
				return;
			}

			postPublish.classList.add("publishing");
			postPublish.innerHTML = "Publishing...";
			publishing = true;

			let dateAdded = new Date();
			dateAdded.setDate(parseInt(postDay.value));
			dateAdded.setMonth(parseInt(postMonth.value) - 1);
			dateAdded.setFullYear(parseInt(postYear.value));
			dateAdded.setHours(0);
			dateAdded.setMinutes(0);
			dateAdded.setSeconds(0);
			dateAdded = dateAdded.getTime();

			let promise;
			if(args.edit) {
				promise = Posts.edit(
					args.page,
					args.section,
					args.partition,
					args.id,
					Object.assign({
						name: postName.value,
						by: postBy.value || null,
						bygroup: postByGroup.value || null,
						picture: imageFile,
						view: /*postShow.value*/ null,
						download: uploadedFile,
						dateAdded: dateAdded
					}, pageInputs)
				);
			} else {
				promise = Posts.add(
					args.page,
					args.section,
					args.partition,
					Object.assign({
						name: postName.value,
						by: postBy.value || null,
						bygroup: postByGroup.value || null,
						picture: imageFile,
						view: /*postShow.value*/ null,
						download: uploadedFile,
						dateAdded: dateAdded
					}, pageInputs)
				);
			}

			promise.then(() => {
				postPublish.innerHTML = "Published";

				location.href = "?/" + args.page;
			}, e => {
				publishing = false;
				postPublish.classList.remove("publishing");
				showPublishError(e);
			});
		};
	});