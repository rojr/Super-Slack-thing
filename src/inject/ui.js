$('body').on('DOMNodeInserted', '#menu', function(event){
  if (event.target.id != 'menu') {
    return;
  }

  var menuItems = $(this).find('#menu_items')
  var scriptsButton = $('<li id="extra-scripts" class="flexpane_menu_item" data-tab-id="extra-scripts">' +
      '<a>' +
        '<i class="ts_icon ts_icon_emoji_celebration"></i>' +
        'Scripts' +
      '</a>' +
      '</li>');

  scriptsButton.click(function() {
    alert('hahha u hacker');
  });
  menuItems.append(scriptsButton);
});
