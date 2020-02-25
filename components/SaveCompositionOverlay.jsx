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
import {withTranslation} from '../../i18n';

import './SaveCompositionOverlay.scss'

// TODO is it a Skatter "composition"? move to Skatter project?

class SaveCompositionOverlay extends React.PureComponent
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
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.props.subTitle}
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
                    <div className="browse-cover">
                        <TextField
                            label="Cover image"
                            margin="dense"
                            disabled
                            value={ this.props.cover }
                            fullWidth
                        />
                        <Button onClick={() => { skpCallback('browse_cover') }} variant="contained" className="browse-cover-button">
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
                    <Button onClick={() => { this.props.onSave(this.state.guid, this.state.name, this.state.description, this.state.type, this.props.cover, this.state.tags); this.props.onClose() }} color="primary" variant="contained" >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withTranslation()(SaveCompositionOverlay);
