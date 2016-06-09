<td><%- id %></td>
<td><%- title %></td>
<td><%- createdAt %></td>
<td><%- modifiedAt %></td>
<td><%- description %></td>
<td>
    <a href="#posts/<%- id %>" class="btn btn-small js-show">
        <i class="icon-eye-open"></i>
        Show
    </a>
    <a href="#posts/<%- id %>/edit" class="btn btn-small js-edit">
        <i class="icon-pencil"></i>
        Edit
    </a>
    <button class="btn btn-small js-delete">
        <i class="icon-remove"></i>
        Delete
    </button>
</td>