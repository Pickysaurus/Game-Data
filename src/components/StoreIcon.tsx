import Image from "next/image";

type StoreIconTypes = 'GOG' | 'Steam' | 'Epic' | 'Xbox' | 'EA' | 'Ubisoft' | 'Amazon' | 'Rockstar' | 'Battlenet';

interface IStoreIconProps {
    store: StoreIconTypes;
    disabled?: boolean;
    altText?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
}

const fullNames: Record<StoreIconTypes, string> = {
    Amazon: 'Amazon Games',
    GOG: 'GOG.com',
    Steam: 'Steam',
    Epic: 'Epic Games Store',
    Xbox: 'Xbox (PC)',
    EA: 'EA Play/Origin',
    Ubisoft: 'Ubisoft Connect',
    Rockstar: 'Rockstar Launcher',
    Battlenet: 'Battle.net'
}

export default function StoreIcon(props: IStoreIconProps) {
    const name: string = fullNames[props.store];
    const style = props.style ?? { margin: '4px' };
    if (props.disabled === true) style.opacity = '0.25';
    return (
    <Image 
        src={`/${props.store}.svg`} 
        alt={props.altText ?? name} 
        width={props.width ?? 30} 
        height={props.height ?? 30} 
        title={props.altText ?? name}
        style={style}
    />
    )
}