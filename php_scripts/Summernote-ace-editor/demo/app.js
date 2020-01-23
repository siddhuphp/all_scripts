$(function() {
	$('#summernote').summernote({
		ace: {
			aceTheme: 'ace/theme/dawn',
			aceMode: 'c_cpp',
			aceLineHeight: '32px',
			aceFontSize: '16px',
			aceModeSelectorLabel: 'select your language',
			aceCodeInputAreaLabel: 'input your code',
			aceCodeSubmitBtnLabel: 'Insert',
			aceModalTitle: 'Insert Code',
			aceModes: [
				'c/c++', 'java', 'javascript', 'perl', 'python', 'php', 'ruby',
				'sh', 'golang', 'julia', 'rust', 'scala', 'haskell', 'lisp', 'lua', 'sql',
				'coffee', 'typescript'
			],
		},
		toolbar: [
			['myplugin', ['aceCodeEditor']],
			['style', ['style']],
			['font', ['bold', 'underline', 'clear']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['table', ['table']],
			['insert', ['link', 'picture', 'video']],
			['view', ['fullscreen', 'codeview', 'help']]
		],
		placeholder: 'Hello bootstrap 4',
		tabsize: 2,
		height: 100
	});
});