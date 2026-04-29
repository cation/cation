/**
 * UI Action: View Caller Phone
 * Table:       incident
 * Action type: Client (runs in the browser)
 * Form button: true
 *
 * Service Operations Workspace note:
 *   In SOW, traditional client UI Actions on the record form have access
 *   to g_form and g_modal. If this action is surfaced as a workspace
 *   Contextual Action instead, move the g_modal.showFrame() call into
 *   the appropriate workspace action handler.
 *
 * The incident field that holds the caller sys_id is read from a
 * sys_property rather than being hardcoded, so it can be changed without
 * a code deployment.
 *
 * sys_property to create:
 *   Name:  your.incident.caller_field
 *   Value: caller_id              (or whatever field holds the caller sys_id)
 */

var ga = new GlideAjax('UserPhoneInfoAjax');
ga.addParam('sysparm_name',        'getSysProperty');
ga.addParam('sysparm_prop_name',   'your.incident.caller_field');
ga.addParam('sysparm_default_val', 'caller_id');
ga.getXMLAnswer(function (callerFieldName) {
    var callerId = g_form.getValue(callerFieldName);

    if (!callerId) {
        g_form.addErrorMessage(
            'No caller is set on this incident. Please populate the caller field first.'
        );
        return;
    }

    g_modal.showFrame(
        'Caller Phone Information',                               // modal title
        'user_phone_info.do?sysparm_caller_id=' + callerId,      // page + caller sys_id
        700,                                                      // width  (px)
        480                                                       // height (px)
    );
});
