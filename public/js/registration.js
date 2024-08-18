<h1>Registered Users</h1>
<table>
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            </tr>
    </thead>
    <tbody>
        <% users.forEach(user => { %>
            <tr>
                <td><%= user.first_name %></td>
                <td><%= user.last_name %></td>
                </tr>
        <% }); %>
    </tbody>
</table>