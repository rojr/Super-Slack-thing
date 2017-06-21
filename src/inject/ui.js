$('body').on('DOMNodeInserted', '#menu', function(event){
  if (event.target.id != 'menu') {
    return;
  }
  setTimeout(function(){
    var menuItems = $('#menu_items')

    if (!menuItems.closest('#menu').hasClass('flex_menu')) {
      return;
    }

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
  }, 1);
});
