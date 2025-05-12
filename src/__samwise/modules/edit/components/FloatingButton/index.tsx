import React, { useEffect, useState } from 'react';
import TooltipWrapper from '@/components/tooltip';
import type { LucideProps } from 'lucide-react';

type IconType = React.ComponentType<LucideProps>;

interface FloatingButtonProps {
  onClick: () => void;
  type:
    | 'edit-blog'
    | 'edit-post'
    | 'delete-post'
    | 'create-post'
    | 'toggle-edit-mode';
  isEditMode?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  type,
  isEditMode,
}) => {
  const [icons, setIcons] = useState<{
    Edit: IconType;
    Trash2: IconType;
    Eye: IconType;
    Settings: IconType;
    FilePlus: IconType;
    Save: IconType;
  } | null>(null);

  useEffect(() => {
    // Dynamically import lucide-react as an ESM
    import('lucide-react').then((module) => {
      setIcons({
        Edit: module.Edit,
        Trash2: module.Trash2,
        Eye: module.Eye,
        Settings: module.Settings,
        FilePlus: module.FilePlus,
        Save: module.Save,
      });
    });
  }, []);

  if (!icons) {
    return null; // or a loading spinner if desired
  }

  const ariaLabel =
    type === 'edit-blog'
      ? 'Configure Blog'
      : type === 'edit-post'
        ? 'Configure Post'
        : type === 'delete-post'
          ? 'Delete Post'
          : type === 'create-post'
            ? 'Create New Post'
            : type === 'toggle-edit-mode'
              ? isEditMode
                ? 'Preview Post'
                : 'Edit Post'
              : '';

  const IconComponent =
    type === 'delete-post'
      ? icons.Trash2
      : type === 'create-post'
        ? icons.FilePlus
        : type === 'toggle-edit-mode'
          ? isEditMode
            ? icons.Eye
            : icons.Edit
          : icons.Settings;

  return (
    <TooltipWrapper message={ariaLabel} position="left">
      <button
        onClick={onClick}
        className="text-white p-2"
        aria-label={ariaLabel}
      >
        <IconComponent size={16} className="text-current" />
      </button>
    </TooltipWrapper>
  );
};

export default FloatingButton;
