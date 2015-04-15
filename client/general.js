$.fn.toObject = function() {
	var fields = {}
	$(this).find('[name]').each(function() {
		fields[this.name] = this.value
	})
	return fields
}