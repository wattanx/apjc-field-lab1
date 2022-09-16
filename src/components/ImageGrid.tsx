import type { FC } from "react";
import useSWR from "swr";
import moment from "moment";
import { DownloadIcon } from "./DownloadIcon";
import { LockIcon } from "./LockIcon";
import { EyeIcon } from "./EyeIcon";

const ImageCard: FC<{ image: Image }> = ({
  image: { id, previewURL, name, alt, uploaded, isPrivate},
}) => {
  return (
    <div className="my-3 shadow-lg rounded-b-xl bg-white">
      <figure>
        <div className="sm:aspect-w-1 sm:aspect-h-1">
          <img src={previewURL} className="w-full object-contain" alt={alt} />
        </div>
        <figcaption className="m-3">
          <code>{name}</code>
          <p>
            <time dateTime={uploaded} className="text-sm">
              {moment(uploaded).fromNow()}
            </time>
          </p>
        </figcaption>
      </figure>
      <div className="flex justify-end p-2">
        <div className="flex items-center mr-2">
          <svg className="h-8 w-8 p-1">
            <EyeIcon />
          </svg>
        </div>
{/*         {!isPrivate ? (
          <a
            className="text-green-800 bg-green-200 rounded-md h-8 w-8 p-1"
            aria-label="Download"
            href={`/api/download?id=${id}`}
            download
          >
            <DownloadIcon />
          </a>
        ) : (
          <div className="text-gray-800 bg-gray-200 rounded-md h-8 w-8 p-1">
            <LockIcon />
          </div>
        )} */}
      </div>
    </div>
  );
};

export const ImageGrid: FC = () => {
  const { data, error } = useSWR<{ images: Image[] }>("/api/images");

  if (error || data === undefined) {
    return (
      <div>
        An unexpected error has occurred when fetching the list of images.
        Please try again.
      </div>
    );

  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data.images.map((image) => (
        <ImageCard image={image} key={image.id} />
      ))}
    </div>
  );
};
