export const useSidebar = () => {
  const id = useId();
  const isActive = useState<boolean>(`sidebarIsActive`, () => false);
  function toggleActive() {
    isActive.value = !isActive.value;
  }
  return {
    isActive,
    toggleActive,
  };
};
