import namegen from 'sillyname';
import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import ChipInput from 'material-ui-chip-input'

import * as utils from '../../lindaleui/utils/utils';
import {translate} from '../../i18n';

class SaveCompositionOverlay extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.state = { guid: props.guid, 
                       name: props.name || "", 
                       description: props.description || "", 
                       type: props.type || "in_model", 
                       tags: props.tags || [] 
                     };
    }

    onChangeName = event => {
        this.setState({ name: event.target.value });
    };

    onChangeDescription = event => {
        this.setState({ description: event.target.value });
    };

    onAddTag = tag => {
        let tags = this.state.tags.slice(0);
        tags.push(tag);
        this.setState({ tags: tags });
    };

    onRemoveTag = (tag, index) => {
        let tags = this.state.tags.slice(0);
        tags.splice(index, 1);
        this.setState({ tags: tags });
    };

    render()
    {
        return (
            <Dialog open onClose={this.props.onClose} className="save-dialog">
                <DialogTitle>Save to Library</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Save composition to the Library
                    </DialogContentText>
                    <TextField
                        label="Name"
                        margin="dense"
                        value={ this.state.name }
                        onChange={this.onChangeName}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        margin="dense"
                        value={ this.state.description }
                        onChange={this.onChangeDescription}
                        fullWidth
                        multiline
                        rowsMax="4"
                    />
                    <div className="browse-thumbnail">
                        <TextField
                            label="Thumbnail"
                            margin="dense"
                            disabled
                            value={ this.props.thumbnail }
                            fullWidth
                        />
                        <Button onClick={() => { skpCallback('browse_thumbnail') }} variant="raised" className="browse-thumbnail-button">
                            Browse
                        </Button>
                    </div>
                    <ChipInput label="Tags"
                               margin="dense"
                               fullWidth
                               value={this.state.tags} 
                               onAdd={ this.onAddTag } 
                               onDelete={ this.onRemoveTag }
                               newChipKeyCodes={[9, 13, 188] /*[tab, enter, comma]*/} /> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => { this.props.onSave(this.state.guid, this.state.name, this.state.description, this.state.type, this.state.tags); this.props.onClose() }} color="primary" variant="raised" >
                        Save
                    </Button>
                </DialogActions>
            </Dialog> 
        );
    }
}

export default translate()(SaveCompositionOverlay);
