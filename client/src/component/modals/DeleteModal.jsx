import React from 'react';

const DeleteModal = (props) => {
    const { open, onClose, data, onSuccess, titleMessage } = props;
    return (
        <div>
            {open &&
                <>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Delete Route</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    {titleMessage}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={onClose}>No</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => onSuccess(data)}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default DeleteModal