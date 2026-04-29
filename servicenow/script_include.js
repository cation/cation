/**
 * Script Include: UserPhoneInfoAjax
 * Scope: global
 * Access: public
 *
 * GlideAjax methods called by the user_phone_info UI page.
 * Replace 'your.property.name' with the actual sys_property key.
 */
var UserPhoneInfoAjax = Class.create();
UserPhoneInfoAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    /**
     * Returns the value of an arbitrary sys_user field for the logged-in user.
     * Used to populate the live preview when the dropdown selection changes.
     *
     * Params: sysparm_field_name — the sys_user column name to read
     */
    getFieldValue: function () {
        var fieldName = this.getParameter('sysparm_field_name') || '';
        if (!fieldName) { return ''; }

        var gr = new GlideRecord('sys_user');
        gr.get(gs.getUserID());
        return (gr.isValidRecord() ? gr.getValue(fieldName) : '') || '';
    },

    /**
     * Submit function — accepts the user ID and resolves the field value
     * from the user record, then returns both for downstream processing.
     *
     * Params:
     *   sysparm_user_id    — sys_user sys_id of the logged-in user
     *   sysparm_field_name — the selected sys_user field name
     *
     * Returns JSON: { success, userId, fieldName, fieldValue } | { success, error }
     */
    submitPhoneField: function () {
        var userId    = this.getParameter('sysparm_user_id')    || '';
        var fieldName = this.getParameter('sysparm_field_name') || '';

        if (!userId || !fieldName) {
            return JSON.stringify({ success: false, error: 'Missing required parameters.' });
        }

        var gr = new GlideRecord('sys_user');
        if (!gr.get(userId)) {
            return JSON.stringify({ success: false, error: 'User record not found.' });
        }

        var fieldValue = gr.getValue(fieldName) || '';

        // ── Add your business logic here ──────────────────────────────
        // At this point you have:
        //   userId     — the user's sys_id
        //   fieldValue — the value of the selected field for that user
        // Example: gs.setProperty('your.property.name', fieldName);
        // ─────────────────────────────────────────────────────────────

        return JSON.stringify({
            success:    true,
            userId:     userId,
            fieldName:  fieldName,
            fieldValue: fieldValue
        });
    },

    /**
     * Returns the currently configured sys_user field name from sys_property.
     * Useful if the client needs to know the active configuration.
     *
     * Params: sysparm_prop_name — the sys_property key to read
     */
    getPhoneField: function () {
        var propName = this.getParameter('sysparm_prop_name') || 'your.property.name';
        return gs.getProperty(propName, 'phone') || 'phone';
    },

    type: 'UserPhoneInfoAjax'
});
