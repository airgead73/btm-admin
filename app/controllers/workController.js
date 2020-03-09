const Work = require('../models/Work');
const asyncHandler = require('../middleware/async');

// Display list of all works.
exports.work_list = asyncHandler(async function (req, res, next) {
	const works = await Work.find().sort('-createdAt');
	const count = {};
	count.all = works.length;
	count.sculpture = works.filter(work => work.modality === 'sculpture').length
	count.painting = works.filter(work => work.modality === 'painting').length
	count.drawing = works.filter(work => work.modality === 'drawing').length
	//req.flash('success_msg', 'works found');
	res.render('pages/works/index', {
		success: true,
		title: 'works',
		//success_msg: res.locals.sucess_msg,
		count: count,
		data: works
	});

});

// Display detail page for a specific work.
exports.work_detail = asyncHandler(async function (req, res) {
	const work = await Work.findById(req.params.workID);
	res.render('pages/works/detail', {
		title: work.title,
		data: work
	});
});

// Display work create form on GET.
exports.work_create_get = asyncHandler(async function (req, res) {
	res.render('pages/works/add', {
		title: 'add work'
	});
});

// Handle work create on POST.
exports.work_create_post = asyncHandler(async function (req, res) {
	const { title, desc, modality, material, category } = req.body;
	work = await Work.create({
		title: title,
		desc: desc,
		modality: modality,
		material: material,
		category: category
	})
	console.log(req.body);
	res.redirect('/works')
});

// Display work delete form on GET.
exports.work_delete_get = asyncHandler(async function (req, res) {
	res.send('NOT IMPLEMENTED: work delete GET');
});

// Handle work delete on DELETE.
exports.work_delete_delete = asyncHandler(async function (req, res) {
	const work = await Work.findByIdAndDelete(req.params.workID);
	res.redirect('/works');
});

// Display work update form on GET.
exports.work_update_get = asyncHandler(async function (req, res) {
	const work = await Work.findById(req.params.workID);
	res.render('pages/works/update', {
		title: `update ${work.title}`,
		data: work
	})

});

// Handle work update on PUT.
exports.work_update_put = asyncHandler(async function (req, res) {
	const work = await Work.findByIdAndUpdate(req.params.workID, req.body, {
		new: true,
		runValidators: true
	});
	req.flash('success_msg', `"${req.body.title}" updated`);
	res.redirect('/works');
});
