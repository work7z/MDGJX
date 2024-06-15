<script setup lang="ts">
import { convertTextToUnicode, convertUnicodeToText } from './text-to-unicode.service';
import { useCopy } from '@/composable/copy';

const inputText = ref('');
const unicodeFromText = computed(() => inputText.value.trim() === '' ? '' : convertTextToUnicode(inputText.value));
const { copy: copyUnicode } = useCopy({ source: unicodeFromText });

const inputUnicode = ref('');
const textFromUnicode = computed(() => inputUnicode.value.trim() === '' ? '' : convertUnicodeToText(inputUnicode.value));
const { copy: copyText } = useCopy({ source: textFromUnicode });
</script>

<template>
  <c-card title="Text 转 Unicode">
    <c-input-text v-model:value="inputText" multiline placeholder="例如 'Hello Avengers'" label="输入Text转成Unicode" autosize autofocus raw-text test-id="text-to-unicode-input" />
    <c-input-text v-model:value="unicodeFromText" label="以你的Text转换后的Unicode" multiline raw-text readonly mt-2 placeholder="转换后的Unicode在这里" test-id="text-to-unicode-output" />
    <div mt-2 flex justify-center>
      <c-button :disabled="!unicodeFromText" @click="copyUnicode()">
        拷贝unicode到粘贴板
      </c-button>
    </div>
  </c-card>

  <c-card title="Unicode 转 Text">
    <c-input-text v-model:value="inputUnicode" multiline placeholder="输入 Unicode" label="输入Unicode转成Text" autosize raw-text test-id="unicode-to-text-input" />
    <c-input-text v-model:value="textFromUnicode" label="以你的Unicode转换后的Text" multiline raw-text readonly mt-2 placeholder="转换后的Text在这里" test-id="unicode-to-text-output" />
    <div mt-2 flex justify-center>
      <c-button :disabled="!textFromUnicode" @click="copyText()">
        拷贝text到粘贴板
      </c-button>
    </div>
  </c-card>
</template>
