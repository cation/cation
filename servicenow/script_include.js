/**
 * Script Include: UserPhoneInfoAjax
 * Scope: global
 * Access: public
 *
 * GlideAjax helper — alternative to the Jelly server-side approach in
 * ui_page.html. Reads the sys_property to discover the configured sys_user
 * field name, then returns that field's value for the logged-in user.
 */
var UserPhoneInfoAjax = Class.create();
UserPhoneInfoAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    /**
     * Returns the logged-in user's phone value, resolved dynamically via a
     * sys_property whose VALUE is the sys_user field name to read from.
     *
     * Client call:
     *   sysparm_name=getUserPhone
     *   sysparm_prop_name=your.property.name   (the sys_property key)
     */
    getUserPhone: function () {
        var propName = this.getParameter('sysparm_prop_name') || 'your.property.name';
        var fieldName = gs.getProperty(propName, 'phone') || 'phone';

        var gr = new GlideRecord('sys_user');
        gr.get(gs.getUserID());
        if (!gr.isValidRecord()) {
            return '';
        }
        return gr.getValue(fieldName) || '';
    },

    /**
     * Returns the raw sys_property value (i.e. the configured field name).
     * Useful if the client needs to display which field is configured.
     *
     * Client call:
     *   sysparm_name=getPhoneField
     *   sysparm_prop_name=your.property.name
     */
    getPhoneField: function () {
        var propName = this.getParameter('sysparm_prop_name') || 'your.property.name';
        return gs.getProperty(propName, 'phone') || 'phone';
    },

    type: 'UserPhoneInfoAjax'
});

/* ---------- Example client script (paste into the UI Page client script field) ----------

function onLoad() {
    var PROP_NAME = 'your.property.name'; // replace with your actual sys_property key

    // Show which field is configured
    var gaField = new GlideAjax('UserPhoneInfoAjax');
    gaField.addParam('sysparm_name', 'getPhoneField');
    gaField.addParam('sysparm_prop_name', PROP_NAME);
    gaField.getXMLAnswer(function (fieldName) {
        var el = document.getElementById('configured-field');
        if (el) el.innerText = fieldName || '(not set)';
    });

    // Show the user's phone value from that field
    var gaPhone = new GlideAjax('UserPhoneInfoAjax');
    gaPhone.addParam('sysparm_name', 'getUserPhone');
    gaPhone.addParam('sysparm_prop_name', PROP_NAME);
    gaPhone.getXMLAnswer(function (phoneValue) {
        var el = document.getElementById('user-phone');
        if (el) el.innerText = phoneValue || '(not set)';
    });
}

*/
