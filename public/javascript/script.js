deleteUserAlert = () => {
    return confirm("Are you sure you want to delete this user?");
}
document.getElementById('form-user').onsubmit = deleteUserAlert;

deleteCourseAlert = () => {
    return confirm("Are you sure you want to delete this course?");
}
document.getElementById('form-course').onsubmit = deleteCourseAlert;