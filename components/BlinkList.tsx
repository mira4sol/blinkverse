"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { BlinkInterface } from "@/interfaces/models.interface";
import { BlinkService } from "@/lib/services/blink.service";
import { useActionsRegistryInterval } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { clusterApiUrl } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { BlinkLoader } from "./BlinkLoader";
import LoadingIcon from "./ui/LoadingIcon";

const BlinkList = () => {
  const [blinks, setBlinks] = useState<BlinkInterface[]>([]);
  const [blinkLoading, setBlinksLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const { isRegistryLoaded } = useActionsRegistryInterval();
  const { adapter } = useActionSolanaWalletAdapter(
    clusterApiUrl("mainnet-beta")
  );

  const computeUrl = (id: string) => {
    return typeof window !== undefined
      ? `solana-action:${window?.location?.origin}/api/actions/verse/${id}`
      : "";
  };

  const fetchBlinks = async () => {
    setBlinksLoading(true);
    const { message, success, data } = await BlinkService.fetchBlinks(0);
    if (!success)
      return toast({
        title: "Error while fetching blink",
        variant: "destructive",
        description: message,
      });

    setBlinks(data);
  };

  useEffect(() => {
    // if (user)
    fetchBlinks().finally(() => setBlinksLoading(false));
  }, []);

  return (
    <div className="">
      {blinkLoading && (
        <div className="flex items-center justify-center w-full">
          <LoadingIcon className="mt-10 !w-8 !h-8" />
        </div>
      )}

      {isRegistryLoaded ? (
        <div className=" mt-3 columns-1 md:columns-2 lg:columns-2 gap-5 w-full min-h-screen items-start ">
          {blinks?.map((item, i) => (
            <BlinkLoader key={i} url={computeUrl(item?.id)} adapter={adapter} />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <LoadingIcon className="mt-10 !w-8 !h-8" />
        </div>
      )}
    </div>
  );
};

export default BlinkList;
