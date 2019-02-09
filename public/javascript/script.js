deleteUserAlert = () => {
    return confirm("Are you sure you want to delete this user?");
}
document.getElementById('form-user').onsubmit = deleteUserAlert;