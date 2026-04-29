/**
 * Script Include: UserPhoneInfoAjax
 * Scope: global
 * Access: public
 *
 * GlideAjax helper — used only if you prefer to load data via
 * client-side AJAX instead of the Jelly server-side approach in
 * ui_page.html. See client_script below for usage.
 */
var UserPhoneInfoAjax = Class.create();
UserPhoneInfoAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    /**
     * Returns the logged-in user's phone number.
     * Client call: sysparm_name=getUserPhone
     */
    getUserPhone: function () {
        return gs.getUser().getPhone() || '';
    },

    /**
     * Returns the value of a sys_property.
     * Client call: sysparm_name=getSysProperty, sysparm_prop_name=<key>
     */
    getSysProperty: function () {
        var propName = this.getParameter('sysparm_prop_name') || '';
        if (!propName) {
            return '';
        }
        return gs.getProperty(propName, '') || '';
    },

    type: 'UserPhoneInfoAjax'
});

/* ---------- Example client script (paste into the UI Page client script field) ----------

function onLoad() {
    // Fetch the logged-in user's phone
    var gaPhone = new GlideAjax('UserPhoneInfoAjax');
    gaPhone.addParam('sysparm_name', 'getUserPhone');
    gaPhone.getXMLAnswer(function (phoneValue) {
        var el = document.getElementById('user-phone');
        if (el) el.innerText = phoneValue || '(not set)';
    });

    // Fetch a sys_property value — replace the key with your actual property name
    var gaProp = new GlideAjax('UserPhoneInfoAjax');
    gaProp.addParam('sysparm_name', 'getSysProperty');
    gaProp.addParam('sysparm_prop_name', 'your.property.name');
    gaProp.getXMLAnswer(function (propValue) {
        var el = document.getElementById('prop-value');
        if (el) el.innerText = propValue || '(not set)';
    });
}

*/
