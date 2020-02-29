// Случайный форум

var links = ["/1Apr5ba6u9Nz6eFASmFrefGvyBKkM76QgE/", "/13zWcviPiQWhyy8Yprou2pfvcfGcaNW3MF/", "/17PEJfM9tdKs1JTxAMbcKzmYzrKJcUwMk5/", "/1LnBdExztQKGSb3wnnchtczk9dyzJQtUp4/", "/1Jb5ZdmvTzVnHpa2hayjQk3H2kZgNVbmBb/", "/1TALK5znjVqrULiRUiSuNALaCiKpWS1Xq/", "/1Nxyt2VVXyR1AH3HSqSZXqBM32EAv8pLjV/", "/12ePayZ5JtB46T5A5qgpG9rduUxciD2QN6/", "/15zr8fG5h9FZu6dt5CC9kQ1F7PMpiGu6Tm/", "/1A3HoXx4nZBhwz8gkk569RZcLNeTzixpwh/", "/1diyHbGrjKR65DLVpaLoMYsiwqiQYskKD/", "/1F4WVHDpQYxuJL6xEY3EZTYkZds9TTjVHC/", "/1DCApr9WK3oQjfgg5zs4nK2RqB4PGtwbqA/", "/1BpFtPez7mSiShtXfb4wPfMT1dZTuRybfZ/", "/1G56gcfMzp7695tpSHJN8qRR5N2pfTe7fw/", "/1QHkZVa1z3TRrerAqjExERavvodW75bA3c/", "/1oJQLFq6DYkTw6c4MbZDaFEEocSBvR8FW/", "/1JUjBANMM5MjbGrzz3faUd3gXUXmAr3ces/", "/12VHcePybTWpaMh7bUyUA4sJ1wYKZRuqDh/", "/1Dt7FR5aNLkqAjmosWh8cMWzJu633GYN6u/", "/0list.bit/"],
tag;
function surfUp() {
window.setTimeout( changeLink, 0);
return true;
}
function changeLink() {
var url = links[Math.floor(Math.random() * links.length)];
tag.href = url;
tag.innerHTML = url;
}
