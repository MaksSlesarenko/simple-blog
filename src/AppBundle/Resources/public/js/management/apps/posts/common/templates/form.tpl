<div class="modal fade" id="myModal" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="post-title">Title:</label>
                        <input id="post-title" name="title" class="form-control" type="text" value="<%- title %>"/>
                    </div>
                    <div class="form-group">
                        <label for="post-description">Description:</label>
                        <input id="post-description" name="description" class="form-control" type="text" value="<%- description %>"/>
                    </div>
                    <div class="form-group">
                        <label for="post-body">Body:</label>
                        <input id="post-body" name="body" class="form-control" type="text" value="<%- body %>"/>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button class="btn btn-primary js-submit">Save</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->