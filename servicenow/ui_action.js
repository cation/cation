/**
 * UI Action: View Caller Phone
 * Table:      incident
 * Action type: Client  (runs in the browser)
 * Form button: true
 *
 * Opens user_phone_info.do in a modal, passing the incident's
 * caller_id so the page can look up that user's phone details.
 */

var callerId = g_form.getValue('caller_id');

if (!callerId) {
    g_form.addErrorMessage('This incident does not have a caller. Please set the Caller field first.');
    return;
}

g_modal.showFrame(
    'Caller Phone Information',                                  // modal title
    'user_phone_info.do?sysparm_caller_id=' + callerId,         // page URL + caller sys_id
    700,                                                         // width  (px)
    480                                                          // height (px)
);
