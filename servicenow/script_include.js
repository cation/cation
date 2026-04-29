/**
 * Script Include: UserPhoneInfoAjax
 * Scope: global
 * Access: public
 *
 * GlideAjax methods called by the user_phone_info UI page.
 * The page is opened from the Incident form via a UI Action that
 * passes the incident's caller_id as sysparm_user_id.
 *
 * Replace 'your.property.name' with the actual sys_property key.
 */
var UserPhoneInfoAjax = Class.create();
UserPhoneInfoAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    /**
     * Returns the value of an arbitrary sys_user field for a given user.
     * Called on dropdown change to populate the live preview.
     *
     * Params:
     *   sysparm_user_id    — sys_id of the user to read (the incident caller_id)
     *   sysparm_field_name — the sys_user column name to read
     */
    getFieldValue: function () {
        var userId    = this.getParameter('sysparm_user_id')    || '';
        var fieldName = this.getParameter('sysparm_field_name') || '';
        if (!userId || !fieldName) { return ''; }

        var gr = new GlideRecord('sys_user');
        gr.get(userId);
        return (gr.isValidRecord() ? gr.getValue(fieldName) : '') || '';
    },

    /**
     * Submit function — accepts the caller's user ID and the selected field
     * name, resolves the field value from the user record, and returns both.
     *
     * Params:
     *   sysparm_user_id    — sys_id of the caller (from the incident caller_id)
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
        //   userId     — the caller's sys_id
        //   fieldValue — the value of the selected field for that caller
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
     * Returns the value of any sys_property. Used by the UI Action to
     * look up the incident caller field name from a property at runtime,
     * avoiding hardcoded field names in client-side code.
     *
     * Params:
     *   sysparm_prop_name   — the sys_property key to read
     *   sysparm_default_val — value to return when the property is not set
     */
    getSysProperty: function () {
        var propName   = this.getParameter('sysparm_prop_name')   || '';
        var defaultVal = this.getParameter('sysparm_default_val') || '';
        if (!propName) { return defaultVal; }
        return gs.getProperty(propName, defaultVal) || defaultVal;
    },

    type: 'UserPhoneInfoAjax'
});
