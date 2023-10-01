import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/snippets/json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import AceEditor from 'react-ace';

import { isJSONString } from '@/util/isJSONString';

export default function AceEditorComponent(props: {
    value: any;
    setValue: any;
}) {
    const onChange = useCallback(
        debounce((event: any) => {
            if (isJSONString(event)) {
                const current = JSON.parse(event);
                props.setValue(JSON.stringify(current, null, 2));
            } else {
                props.setValue(event);
            }
        }, 150),
        [props.setValue],
    );

    return (
        <AceEditor
            mode="javascript"
            theme="github"
            width="100"
            value={props.value}
            onChange={onChange}
            editorProps={{ $blockScrolling: true }}
            enableSnippets={true}
            setOptions={{
                useWorker: false,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
        />
    );
}
