module.exports = node => {
  var self = this;

  this.scriptTab = $('<div class="panel" id="scripts_tab"></div>');
  this.scriptTab.html('<div class="heading" tabindex="-1"><div class="heading_row"><h2 id="scripts-header" class="heading_text overflow_ellipsis">Scripts</h2><button class="btn_basic close_flexpane" aria-label="Close Right Sidebar" title="Close Right Sidebar" type="button"><ts-icon class="ts_icon_times" aria-hidden="true"></ts-icon></button>					</div><div class="heading_row flex_heading_controls"></div></div>');
  $('#flex_contents').append(this.scriptTab);

  $('body').on('DOMNodeInserted', '#menu', function(event){
    if (event.target.id != 'menu') {
      return;
    }
    setTimeout(function(){
      var menuItems = $('#menu_items')

      if (!menuItems.closest('#menu').hasClass('flex_menu')) {
        return;
      }

      if (menuItems.find('#extra-scripts').length) {
        return;
      }

      var scriptsButton = $('<li id="extra-scripts" class="flexpane_menu_item" data-tab-id="extra-scripts">' +
          '<a>' +
            '<i class="ts_icon ts_icon_emoji_celebration"></i>' +
            'Scripts' +
          '</a>' +
          '</li>');

      scriptsButton.click(function() {
        $('.panel.active').removeClass('active');
        var clientUi = $('#client-ui');
        if (!clientUi.hasClass('flex_pane_showing')) {
          clientUi.addClass('flex_pane_showing');
          self.scriptTab.find('.close_flexpane').click(function() {
            self.scriptTab.removeClass('active');
            clientUi.removeClass('flex_pane_showing');
          });
        }
        self.scriptTab.addClass('active');
      });
      menuItems.append(scriptsButton);
    }, 1);
  });
}
