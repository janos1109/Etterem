function signOut() {
    swal({
        title: 'Tényleg ki szeretnél jelentkezni?',
        icon: 'warning',
        buttons: ['Nem', 'Igen'],
    })
    .then((willSignOut) => {
        if (willSignOut) {
            sessionStorage.removeItem('token');
            document.location = 'index.html';
        }
    });
}