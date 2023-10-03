export type WebhookHygraph<T> = {
	data: T & { __typename: string };
	operation: "publish" | "draft";
};
