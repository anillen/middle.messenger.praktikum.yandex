import Block from "../../../utils/Block";
import templateImage from "./image.hbs";
import "./image.scss";

class ImageProperties {
  source: string;
  alt: string;
  class?: string;
}

export default class Image extends Block {
  constructor(props: ImageProperties) {
    super("img", {
      attributes: {
        src: props.source,
        alt: props.alt,
        class: props.class,
      },
    });
  }
  public render(): Node {
    return this.compile(templateImage, this.props);
  }
}
