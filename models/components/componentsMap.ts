import BaseTextInput from "@/components/base/forms/BaseTextInput.vue";
import BaseTextarea from "@/components/base/forms/BaseTextarea.vue";
import BaseSelect from "@/components/base/forms/BaseSelect.vue";
import BaseDateInput from "@/components/base/forms/BaseDateInput.vue";
import BaseCheckbox from "@/components/base/forms/BaseCheckbox.vue";
import BaseDateRange from "@/components/base/forms/BaseDateRange.vue";
import BaseRadio from "@/components/base/forms/BaseRadio.vue";

import { ComponentsMap } from "@/types";

const componentsMap: ComponentsMap = {
  BaseTextInput: BaseTextInput,
  BaseTextarea: BaseTextarea,
  BaseSelect: BaseSelect,
  BaseDateInput: BaseDateInput,
  BaseCheckbox: BaseCheckbox,
  BaseDateRange: BaseDateRange,
  BaseRadio: BaseRadio,
};

export default componentsMap;
