/**
 * File tree tests.
 *
 * @author sw5678
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        "name": "File Tree: basic example",
        "input": "/test_dir1/test_file1.txt\n/test_dir1/test_file2.txt\n/test_dir2/test_file1.txt",
        "expectedOutput": "test_dir1\n|---test_file1.txt\n|---test_file2.txt\ntest_dir2\n|---test_file1.txt",
        "recipeConfig": [
            {
                "op": "文件树",
                "args": ["/", "换行"],
            },
        ],
    }
]);
