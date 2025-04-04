import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 */
export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div className="flex flex-col gap-8">
            <PreviousLink className="w-fit bg-allium-green border border-allium-green hover:bg-allium-light-green transition-colors duration-300 text-allium-cream px-4 py-2 rounded-md">
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <NextLink className="w-fit bg-allium-green border border-allium-green hover:bg-allium-light-green transition-colors duration-300 text-allium-cream px-4 py-2 rounded-md">
              {isLoading ? 'Loading...' : <span>Load More ↓</span>}
            </NextLink>
          </div>
        );
      }}
    </Pagination>
  );
}
