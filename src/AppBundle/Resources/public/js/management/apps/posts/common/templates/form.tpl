<form>
    <div class="control-group">
        <label for="post-title" class="control-label">Title:</label>
        <input id="post-title" name="title" type="text" value="<%- title %>"/>
    </div>
    <div class="control-group">
        <label for="post-description" class="control-label">Description:</label>
        <input id="post-description" name="description" type="text" value="<%- description %>"/>
    </div>
    <div class="control-group">
        <label for="post-body" class="control-label">Body:</label>
        <input id="post-body" name="body" type="text" value="<%- body %>"/>
    </div>
    <button class="btn js-submit">Save</button>
</form>