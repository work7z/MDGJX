import { Button, Card, FileButton, Group, Text } from "@mantine/core";
import { useState } from "react";

export default (props: {
    value: File[],
    onChange: (files: File[]) => void
}) => {
    const files = props.value;
    const setFiles = props.onChange
    return (
        <Card withBorder className="m-0 w-full">
            <Group justify="center">
                <FileButton onChange={setFiles} multiple>
                    {(props) => <Button color="green" {...props}>上传所需文件(支持多选)</Button>}
                </FileButton>
                <Button
                    color="gray"
                    variant="outline"
                    onClick={() => {
                        setFiles([])
                    }}
                >清空列表</Button>
            </Group>

            {files.length > 0 && (
                <Text size="sm" mt="sm">
                    已选文件:
                </Text>
            )}

            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
        </Card>
    )
}